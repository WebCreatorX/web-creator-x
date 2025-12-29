import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useEditorStore = create(
  devtools(
    immer(
      combine(
        {
          selectedNodeId: null as string | null,
        },
        (set) => ({
          selectNode(id: string) {
            set(
              (state) => {
                state.selectedNodeId = id;
              },
              false,
              "editorStore/selectNode",
            );
          },
          clearNode() {
            set(
              (state) => {
                state.selectedNodeId = null;
              },
              false,
              "editorStore/clearNode",
            );
          },
        }),
      ),
    ),
    {
      name: "editorStore",
    },
  ),
);

export const useSelectedNodeId = () =>
  useEditorStore((store) => store.selectedNodeId);

export const useSelectNode = () => useEditorStore((store) => store.selectNode);

export const useClearNode = () => useEditorStore((store) => store.clearNode);
