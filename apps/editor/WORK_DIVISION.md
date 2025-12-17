# WebCreatorX - 팀 업무 분담 가이드

이 문서는 프로젝트의 효율적인 개발을 위해 팀원 간의 업무 영역과 협업 포인트를 정의합니다.
서로의 작업 영역을 침범하지 않으면서, 공통 상태(Store)와 데이터 구조를 기반으로 유기적으로 연결되도록 설계되었습니다.

---

## 0. 들어가기에 앞서
- 프로젝트 구조가 모노레포로 변경되었습니다! monorepoGuide.md 를 꼭 먼저 읽어주세요!

## 1. 프로젝트 개요 및 아키텍처
**WebCreatorX**는 노드 기반의 웹사이트 빌더입니다. 사용자는 좌측 사이드바에서 컴포넌트를 추가하고, 중앙 캔버스에서 확인하며, 우측 사이드바에서 속성을 편집합니다.

### 핵심 데이터 구조 (`WcxNode`)
모든 컴포넌트(Hero, Image, Text 등)는 `WcxNode`라는 공통 타입을 가집니다.
- **정의 위치**: `packages/ui/src/types/nodes.ts`
- **핵심 필드**:
  - `id`: 고유 식별자 (UUID)
  - `type`: 컴포넌트 종류 (Hero, Image, Button 등)
  - `props`: 해당 컴포넌트의 데이터 (텍스트 내용, 이미지 URL 등)
  - `style`: 스타일 정보

---

## 2. 업무 분담 (R&R)

### 🧑‍💻 Milo (Core & Renderer)
- **책임 영역**: 에디터 중앙 캔버스, 노드 렌더링, 전역 상태(Store) 설계, 서버 통신
- **주요 작업**:
  1. **Node Renderer**: 서버에서 받아온 `nodes` 데이터를 순회하며 실제 화면에 그립니다.
  2. **Interaction**: 캔버스 상의 요소를 클릭했을 때, 해당 노드의 `id`를 `selectedId` 상태로 업데이트합니다.
  3. **Drag & Drop (추후)**: 캔버스 내에서의 위치 이동을 담당합니다. (DND 라이브러리 사용 예정)

### 🧑‍💻 Nago (Sidebars & Controls)
- **책임 영역**: 좌측 사이드바(생성), 우측 사이드바(편집), UI 컨트롤
- **주요 작업**:
  1. **좌측 사이드바 (Node Creator)**: 사용 가능한 컴포넌트 목록을 보여주고, 클릭 시 새로운 노드를 생성하여 캔버스에 추가합니다.
  2. **우측 사이드바 (Property Editor)**: 현재 선택된(`selectedId`) 노드의 정보를 보여주고, 사용자가 값을 수정하면 이를 실시간으로 반영합니다.

---

## 3. 협업 포인트: 전역 상태 (Zustand Store)

두 팀원의 작업은 **Zustand Store**를 통해 만납니다. 팀원은 아래 Store Hook이 존재한다고 가정하고 개발을 진행하면 됩니다.

```typescript
// apps/editor/src/store/useEditorStore.ts (예시 구조)

interface EditorState {
  nodes: Record<string, WcxNode>; // 전체 노드 데이터 (ID를 키로 사용)
  selectedId: string | null;      // 현재 선택된 노드 ID
  
  // Actions
  addNode: (node: WcxNode) => void;
  updateNode: (id: string, partialNode: Partial<WcxNode>) => void;
  selectNode: (id: string | null) => void;
}
```

---

## 4. Nago 합류 상세 가이드

### ✅ Task 1: 좌측 사이드바 - 노드 생성
**목표**: 사용자가 새로운 컴포넌트를 추가할 수 있는 패널을 만듭니다.

**구현 내용**:
1. `packages/ui/src/types/nodes.ts`에 정의된 모든 노드 타입(Hero, Text, Image 등)을 버튼 형태로 나열합니다.(완자가 만든 피그마 기획서 참고)
2. 버튼 클릭 시, 해당 타입에 맞는 **기본 노드 객체**를 생성해야 합니다.
   - 예: Text 노드 생성 시 `id: uuid()`, `type: 'Text'`, `props: { text: 'New Text', level: 'h1' }` 등의 초기값을 가진 객체 생성.
3. 생성된 객체를 `useEditorStore`의 `addNode` 함수를 통해 상태에 추가합니다.

**참고**: UI 디자인은 완자가 만든 피그마 기획서를 참고하여 구현해주세요.

### ✅ Task 2: 우측 사이드바 - 속성 편집 (Manifest)
**목표**: 선택된 노드의 세부 내용을 수정하는 패널을 만듭니다.

**구현 내용**:
1. `useEditorStore`에서 `selectedId`와 `nodes`를 구독합니다.
2. **조건부 렌더링**:
   - `selectedId`가 `null`이면: "요소를 선택해주세요" 같은 안내 메시지 표시.
   - `selectedId`가 있으면: `nodes[selectedId]`를 가져와서 편집 UI 표시.
3. **Switch Case 분기**:
   - 선택된 노드의 `type`에 따라 다른 컴포넌트를 렌더링해야 합니다.
   - `Hero` 타입 -> `HeroControl` 컴포넌트 (Heading 입력, 이미지 업로드, 버튼 텍스트 입력창 등)
   - `Image` 타입 -> `ImageControl` 컴포넌트 (URL 입력, Alt 입력창 등)
4. **데이터 업데이트**:
   - 입력창의 값이 변할 때마다 `updateNode(selectedId, { props: { ...newProps } })`를 호출하여 실시간으로 반영합니다.

### 💡 팁
- **컴포넌트 재사용**: 각 속성 편집기(Input, Select, Toggle 등)는 `RightSidebar` 내부에서만 쓰이지 않고 나중에도 쓰일 수 있으니, 작고 재사용 가능한 'Control Component'로 쪼개서 개발하는 것이 좋습니다.
- **타입 안전성**: `packages/ui`에 있는 `WcxNode`, `HeroNode` 등의 타입을 적극 활용하여, 잘못된 속성을 수정하는 일을 방지하세요.

### 중요 사항!
- 위에서 언급한 기획들은 대략적으로 서술한 것입니다. 실제로 구현에 필요한 자세한 정보들은 피그마의 기획서를 절대적으로 따라야합니다.
- 추가로 궁금한 점이 있으면 디스코드로 언제든지 질문해주세요!
---

## 5. 폴더 구조 제안 (apps/editor/src)
```
src/
├── components/
│   ├── editor/           # (Milo) 캔버스, 렌더러
│   │   ├── Canvas.tsx
│   │   └── NodeRenderer.tsx
│   │
│   ├── sidebar/          # (Nago) 사이드바
│   │   ├── LeftSidebar.tsx
│   │   ├── RightSidebar.tsx
│   │   └── controls/     # (Shared) 속성 편집용 작은 컴포넌트들
│   │       ├── TextInput.tsx
│   │       └── ColorPicker.tsx
│   │
│   └── layout/           # 전체 레이아웃 (Header, Main, Sidebars 배치)
│       └── EditorLayout.tsx
│
└── store/
    └── useEditorStore.ts # 전역 상태
```
