import { createContext, useContext } from "react";
import { StoreApi, useStore } from "zustand";

export interface DragState {
  draggingNodeId: string | null;
  hoveredStackId: string | null;
  setDraggingId: (id: string | null) => void;
  setHoveredStackId: (id: string | null) => void;
}

//Context는 스토어 객체를 운반_스토어의 값(state)가 아니라 스토어 객체(StoreApi)를 담는 그릇 생성.
const DragStoreContext = createContext<StoreApi<DragState> | null>(null);

export const DragProvider = DragStoreContext.Provider;

//구독하려는 하위 컴포넌트에서 구독할 수 있는 훅을 사용할 수 있도록 해야한다.
export function useDragStore<T>(selector: (state: DragState) => T): T {
  //스토어 객체를 먼저 가져온다.
  const store = useContext(DragStoreContext);
  if (!store) throw new Error("useDragStore must be used within DragProvider");
  //가져온 스토어 객체를 사용해 하위 컴포넌트의 구독 시스템을 활성화
  return useStore(store, selector);
}
