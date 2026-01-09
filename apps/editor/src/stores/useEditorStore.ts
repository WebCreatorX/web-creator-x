import { WcxNode } from "@repo/ui/types/nodes.js";
import { Layer } from "@repo/ui/types/rnd.js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useEditorStore = create(
  devtools(
    immer(
      combine(
        {
          selectedNodeId: null as string | null,
          nodes: null as null | WcxNode[], //TODO- 추후에 현재 페이지에 해당하는 노드들을 받아오는 로직을 통해 해당 상태가 업데이트 되야 한다.
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
          //TODO-updateNode액션 검토하기
          updateNode(targetNodeId: string, updates: Partial<Layer>) {
            set((state) => {
              const targetNode = state.nodes?.find(
                ({ id }) => id === targetNodeId,
              );
              if (targetNode) {
                targetNode.layout = { ...targetNode.layout, ...updates };
              }
            });
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

export const useCurNodes = () => useEditorStore((store) => store.nodes);

export const useUpdateNode = () => useEditorStore((store) => store.updateNode);
