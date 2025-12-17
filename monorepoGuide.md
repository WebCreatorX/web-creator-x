# WebCreatorX Monorepo 가이드라인

이 프로젝트는 확장성과 코드 재사용성을 높이기 위해 **Monorepo(모노레포)** 구조로 전환되었습니다.
**Turborepo**와 **pnpm workspaces**를 기반으로 구성되어 있으며, 여러 애플리케이션과 공유 패키지를 하나의 저장소에서 효율적으로 관리합니다.

팀원들이 새로운 구조에 빠르게 적응할 수 있도록 가이드를 제공하겠습니다.

---

## 🏗️ 기술 스택 및 도구

- **Monorepo Tool**: [Turborepo](https://turbo.build/) (빌드 시스템 및 태스크 러너)
- **Package Manager**: [pnpm](https://pnpm.io/) (Workspaces 기능 사용)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript

---

## 📂 디렉토리 구조 (Directory Structure)

기존 단일 레포지토리 구조와 달리, 프로젝트는 크게 `apps`와 `packages`로 나뉩니다.

```
web-creator-x/
├── apps/                  # ⭐️ 배포 가능한 애플리케이션들이 위치합니다.
│   ├── editor/            # 메인 에디터 애플리케이션 (Next.js)
│   └── user-template/     # 사용자 템플릿 관련 애플리케이션
├── packages/              # 🛠️ 여러 앱에서 공유하는 라이브러리/패키지들이 위치합니다.
│   └── ui/                # 공통 UI 컴포넌트 (@repo/ui)
├── package.json           # 루트 설정 (Workspaces 정의)
├── pnpm-workspace.yaml    # pnpm 워크스페이스 설정
└── turbo.json             # Turborepo 파이프라인 설정
```

### 💡 주요 변경 사항 (Migration Notes)

| ⚠️ 기존 (Single Repo)                   | ♻️ 변경 후 (Monorepo)               | 설명                                                                  |
| --------------------------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| `/src`                                  | `/apps/editor/src`                  | 메인 앱 코드는 `apps/editor`로 이동했습니다.                          |
| `/src/components`                       | `/packages/ui/src`                  | 재사용 가능한 컴포넌트는 `packages/ui`로 분리되었습니다.              |
| `import { Button } from '@/components'` | `import { Button } from '@repo/ui'` | 공통 컴포넌트는 패키지명(`@repo/ui`)으로 import 합니다.               |
| `npm run dev`                           | `pnpm dev`                          | 루트에서 실행하면 모든 앱을 동시에 실행하거나, 필터링하여 실행합니다. |

---

## 🚀 시작하기 (Getting Started)

### 1. 필수 요구사항

- Node.js (LTS 버전 권장)
- **pnpm** (필수): `npm install -g pnpm`

### 2. 설치

프로젝트 루트에서 의존성을 설치합니다. 모든 앱과 패키지의 의존성이 한 번에 설치됩니다.

```bash
pnpm install
```

### 3. 개발 서버 실행

루트에서 다음 명령어를 실행하면 `apps` 내의 모든 애플리케이션이 동시에 실행됩니다.

```bash
pnpm dev
```

특정 앱만 실행하고 싶다면 `--filter` 옵션을 사용하세요.

```bash
# editor 앱만 실행
pnpm --filter editor dev
```

### 4. 빌드 (Build)

전체 프로젝트를 빌드합니다. Turborepo의 캐싱 기능을 통해 변경된 부분만 빌드되어 속도가 빠릅니다.

```bash
pnpm build
```

---

## 🛠️ 개발 워크플로우 (Development Workflow)

### 패키지 추가하기 (Adding Dependencies)

🚨 특정 앱이나 패키지에 라이브러리를 설치할 때는 `--filter`를 사용해야 합니다.

**예시: `editor` 앱에 `axios` 설치**

```bash
pnpm add axios --filter editor
```

**예시: `ui` 패키지에 `clsx` 설치**

```bash
pnpm add clsx --filter @repo/ui
```

### 공통 컴포넌트 작업 (Working with Shared UI)

`packages/ui`에 있는 컴포넌트를 수정하면, 이를 사용하는 모든 앱(`editor` 등)에 즉시 반영됩니다.
새로운 공통 컴포넌트를 만들 때는 다음 규칙을 따라주세요:

1. `packages/ui/src/components`에 컴포넌트 파일 생성
2. `packages/ui/package.json`의 `exports` 설정 확인 (필요 시)
3. 앱에서 `import { ... } from '@repo/ui'`로 사용

### 새로운 앱 추가하기

`apps/` 폴더 안에 새로운 Next.js 프로젝트 등을 생성하면 자동으로 워크스페이스에 포함됩니다.
`package.json`의 이름을 고유하게 설정해주세요.

---

## ❓ 자주 묻는 질문 (FAQ)

**Q. 왜 `npm` 대신 `pnpm`을 쓰나요?**
A. `pnpm`은 디스크 공간을 효율적으로 사용하고 설치 속도가 매우 빠릅니다. 또한 모노레포의 워크스페이스 기능을 완벽하게 지원합니다.

**Q. `turbo.json`은 무엇인가요?**
A. `build`, `dev`, `lint` 등의 스크립트 실행 순서와 캐싱 정책을 정의하는 파일입니다. 예를 들어, `build` 작업은 의존성 패키지가 먼저 빌드되어야 함을 설정할 수 있습니다.
