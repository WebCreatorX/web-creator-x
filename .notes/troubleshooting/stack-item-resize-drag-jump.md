# 트러블슈팅: Stack Item 리사이즈 후 드래그 시 노드 점프 버그

> **발생일**: 2026-02-25  
> **파일**: `packages/ui/src/core/EditorNodeWrapper.tsx`  
> **라이브러리**: `react-rnd@10.5.2`

---

## 1. 버그 증상

Stack 내부의 `position: relative` 아이템 노드를 **리사이즈한 후 드래그를 시작하면**, 노드가 엉뚱한 위치로 순간이동(점프)하는 현상이 발생했다.

- 리사이즈 중에는 정상적으로 flexbox 정렬을 따름
- 드래그를 시작하는 순간만 점프 발생
- 리사이즈 없이 바로 드래그하면 정상 동작

---

## 2. 원인 분석

### 2-1. react-rnd의 위치 제어 방식

`react-rnd`는 노드의 위치를 **CSS `transform: translate(x, y)`** 로 제어한다.  
`position` prop에 `{ x, y }` 값을 전달하면, 내부적으로 해당 값을 `transform`에 반영한다.

### 2-2. Stack Item의 특수 처리 (`!transform-none`)

Stack 내부 아이템(`position: relative`)은 Flexbox 정렬을 유지해야 하므로,  
`isTransformActive`가 `false`일 때 `!transform-none` CSS 클래스를 강제 적용해  
react-rnd의 transform을 무력화하고 있었다.

```tsx
className={clsx(
  "group cursor-pointer",
  hasRelativePosition && !isTransformActive && "!transform-none",
)}
```

드래그 시작(`onDragStart`) 시에는 `setIsTransformActive(true)`로 이 클래스가 제거되고,  
react-rnd의 transform이 다시 활성화된다.

### 2-3. 버그의 핵심: 리사이즈 중 내부 position 누적

**`!transform-none`이 적용되어 DOM에서는 transform이 보이지 않더라도,  
react-rnd 라이브러리는 리사이즈 중에 내부 position 상태를 계속 누적 변경하고 있다.**

특히 **top 방향 / left 방향 핸들**로 리사이즈할 경우, 요소가 시각적으로 이동해야 하므로  
react-rnd가 내부적으로 `translate(x, y)` 값을 계산해 내부 ref에 저장한다.

```
리사이즈 전: 내부 position = { x: 0, y: 0 }
↓ top-left 방향으로 리사이즈
리사이즈 후: 내부 position = { x: -50, y: -30 } ← 누적됨!
  (DOM에서는 !transform-none으로 가려져 있어서 보이지 않음)
```

### 2-4. 드래그 시작 시 점프 발생 흐름

```
1. onDragStart 실행
2. setIsTransformActive(true) → !transform-none 클래스 제거
3. react-rnd가 리사이즈 중 누적된 내부 position { x: -50, y: -30 }을
   transform에 그대로 반영 → 노드 점프! 💥
4. d.node.offsetLeft / offsetTop 읽음
   → 이미 튀어버린 위치 기준으로 좌표를 읽음 → 잘못된 좌표로 이동
```

---

## 3. 시도한 해결책과 왜 실패했는가

### ❌ 시도 1: `onResizeStop`에서 position 초기화

```tsx
// onResizeStop 내부
if (hasRelativePosition) {
  setDragPosition({ x: 0, y: 0 });
  rndRef.current?.updatePosition({ x: 0, y: 0 });
}
```

**실패 원인:**  
`onResizeStop`에서 초기화해도, 이후 사용자가 리사이즈 핸들을 다시 조작하면  
또다시 내부 position이 누적된다.  
결정적으로, `onResizeStop` 이후와 `onDragStart` 사이에 사용자 인터랙션이 없어도  
react-rnd 내부에서 추가적인 position 변화가 일어날 수 있어 근본적인 해결이 어렵다.  
즉, **"리사이즈가 끝날 때" 초기화는 타이밍이 맞지 않는다.**

---

## 4. 최종 해결책

### ✅ `onDragStart`에서 항상 먼저 초기화

드래그가 시작되는 바로 그 시점, **transform이 활성화되기 직전**에  
`rndRef.current?.updatePosition({ x: 0, y: 0 })`을 호출해  
react-rnd 내부 position을 강제로 `{x:0, y:0}`으로 초기화한다.

```tsx
onDragStart={(e, d) => {
  e.stopPropagation();
  setDraggingId(id);

  if (hasRelativePosition) {
    // ✅ 핵심: isTransformActive를 true로 바꾸기 전에
    // react-rnd 내부 position을 반드시 먼저 리셋해야 한다.
    // 리사이즈 중 누적된 내부 position이 드래그 활성화와 동시에
    // transform에 반영되어 노드가 튀는 버그를 방지.
    rndRef.current?.updatePosition({ x: 0, y: 0 });

    const { offsetLeft, offsetTop } = d.node;
    setIsTransformActive(true);
    // ...
  }
}}
```

### 왜 이 방법이 동작하는가?

| 단계 | 이전(버그) | 이후(수정) |
|---|---|---|
| 리사이즈 중 | 내부 position 누적 | 내부 position 누적 (동일) |
| `onDragStart` 진입 | 누적된 값 그대로 유지 | `updatePosition(0,0)` 으로 강제 리셋 |
| `setIsTransformActive(true)` | 누적된 position이 transform에 반영 → 점프 | 내부 position이 `{0,0}`이므로 안전하게 transform 활성화 |
| `offsetLeft/offsetTop` 읽기 | 잘못된 위치 기준 | 올바른 flexbox 위치 기준 |

**타이밍이 핵심이다.** `setIsTransformActive(true)`로 transform을 활성화하기 **이전에**  
내부 position을 초기화해야 React의 렌더링 사이클에서 올바른 순서가 보장된다.

---

## 5. 핵심 교훈

### "React 상태 초기화"와 "라이브러리 내부 상태 초기화"는 다르다

```
setDragPosition({ x: 0, y: 0 })
→ React가 관리하는 state만 초기화. react-rnd 내부 ref에는 영향 없음.

rndRef.current?.updatePosition({ x: 0, y: 0 })
→ react-rnd가 내부적으로 관리하는 DOM transform 상태까지 직접 초기화.
```

react-rnd처럼 **uncontrolled 방식으로 DOM을 직접 조작하는 라이브러리**는  
React의 state/props와 별도로 자체적인 내부 상태를 가진다.  
Zustand나 useState로 아무리 상태를 바꿔도, **라이브러리 내부 상태는 별도로 초기화**해야 한다.

### 리사이즈 방향에 따라 position이 변한다

react-rnd는 `bottom-right` 방향 리사이즈만 할 때는 position이 변하지 않는다.  
그러나 **`top`, `left`, `top-left`, `top-right`, `bottom-left` 방향**으로 리사이즈하면  
요소가 반대 방향으로 이동해야 하므로 내부 position을 자동으로 변경한다.  
이 동작은 CSS의 `transform-origin`과 다른, react-rnd 고유의 position 계산 방식이다.

### 초기화 타이밍은 "활성화 직전"이어야 한다

- `onResizeStop`: 너무 이름 — 이후 또 다른 조작이 발생할 수 있음
- `onDragStart` (transform 활성화 직전): ✅ 가장 안전한 타이밍

---

## 6. 관련 코드 위치

| 항목 | 위치 |
|---|---|
| 수정 파일 | `packages/ui/src/core/EditorNodeWrapper.tsx` |
| 수정 함수 | `onDragStart` 핸들러 내부 |
| 핵심 API | `rndRef.current?.updatePosition({ x: 0, y: 0 })` |
| react-rnd 타입 정의 | `node_modules/react-rnd/lib/index.d.ts` |

---

## 7. 최종 적용 diff

```diff
onDragStart={(e, d) => {
  e.stopPropagation();
  setDraggingId(id);
  if (hasRelativePosition) {
+   rndRef.current?.updatePosition({ x: 0, y: 0 }); // 내부 position 강제 리셋
    const { offsetLeft, offsetTop } = d.node;
    setIsTransformActive(true);
-   flushSync(() => {
-     updateNode(id, { x: offsetLeft, y: offsetTop });
-     setDragPosition({ x: offsetLeft, y: offsetTop });
-   });
  }
}}
```
