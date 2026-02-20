import { createStore } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

//context에서 스토어를 주입하기 위해 스토어 객체로 생성
export const useDragStore = createStore(
  devtools(
    immer(
      combine(
        {
          draggingNodeId: null as null | string,
          hoveredStackId: null as null | string,
        },
        (set) => ({
          setDraggingId: (id: string | null) =>
            set((store) => {
              store.draggingNodeId = id;
            }),
          setHoveredStackId: (id: string | null) =>
            set((store) => {
              store.hoveredStackId = id;
            }),
        }),
      ),
    ),
    {
      name: "dragStore",
    },
  ),
);
