"use client";

/*
노드 렌더러들이 만든 노드 컴포넌트가 정적이지만, 이를 동적으로 변경해주기위해 필요한 장치입니다.
버튼 컴포넌트를 설계하다 필요를 느껴 해당 context를 고안했습니다.
버튼을 클릭하면 동적으로 웹사이트가 변경되야하면 어떡하지? 에서 해당 컨텍스트에 타겟 id와 행동을 전달해 타겟 노드에 동작을 전달하기 위한 중간 장치입니다.
*/

import { createContext, ReactNode, useContext, useState } from "react";

// 런타임에 변경된 노드들의 상태를 저장하는 객체
// 예: { "node-123": { text: "11" }, "modal-456": { isOpen: true } }
type RuntimeState = Record<string, any>;

interface RuntimeContextType {
  state: RuntimeState;
  updateNodeState: (id: string, newState: any) => void;
}

const RuntimeContext = createContext<RuntimeContextType | null>(null);

//TODO-빠른 구현을 위해 Context를 사용했지만 하나의 상태가 바뀌더라도 해당 context를 구독하는 다른 노드들도 리렌더링이 발생하는 위험이 존재합니다. 꼭 추후에 상태 관리 방식을 리팩토링 해야합니다.
export function RuntimeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RuntimeState>({});

  function updateNodeState(id: string, partial: any) {
    setState((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...partial },
    }));
  }

  const contextValue = {
    state,
    updateNodeState,
  };

  return (
    <RuntimeContext.Provider value={contextValue}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntimeState() {
  const context = useContext(RuntimeContext);
  if (!context) throw new Error("RuntimeProvider is not Here");
  return context;
}
