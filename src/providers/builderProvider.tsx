import { createContext, ReactNode, useContext } from "react";

// Context의 실제 값 (mode)
interface BuilderContextType {
  mode: "editor" | "live";
}

// Provider 컴포넌트가 받을 Props
interface BuilderProviderProps {
  children: ReactNode;
  value: BuilderContextType;
}

//에디터모드, 배포 모드 컨텍스트 생성
const BuilderContext = createContext<BuilderContextType>({ mode: "live" });

/**
 *
 * @returns
 * 컨텍스트를 간단하게 사용할 수 있게 도와주는 훅
 */
export const useBuilderMode = () => useContext(BuilderContext);

/**
 *
 * 에디터 캔버스 컴포넌트를 감싸야 합니다.
 *
 * 에디터 캔버스 컴포넌트의 최상위에서 현재 모드의 컨텍스트를 주입합니다.
 */
export function BuilderProvider({ children, value }: BuilderProviderProps) {
  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}
