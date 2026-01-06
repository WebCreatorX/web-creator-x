import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { WcxNode } from "@repo/ui/types/nodes"
import { mockNodes } from "@/mocks/db";

const useEditorStore = create(
  devtools(
    immer(
      combine(
        {
          nodes: mockNodes as Record<string, WcxNode>, // 전체 노드 데이터
          selectedNodeId: 1004 as string | number | null,
        },
        (set) => ({
          // 노드 추가 (LeftSidebar에서 사용)
          addNode(node: WcxNode) {
            set((state) => {
              state.nodes[node.id] = node;
            }, false, "editorStore/addNode");
          },

          // 노드 수정 (RightSidebar에서 사용)
          updateNode(id: string, partialProps: any) {
            set((state) => {
              if (state.nodes[id]) {
                state.nodes[id].props = {
                  ...state.nodes[id].props,
                  ...partialProps,
                };
              }
            }, false, "editorStore/updateNode");
          },

          selectNode(id: string | null) {
            set((state) => {
              state.selectedNodeId = id;
            }, false, "editorStore/selectNode");
          },
          
          clearNode() {
            set((state) => {
              state.selectedNodeId = null;
            }, false, "editorStore/clearNode");
          },
        })
      )
    ),
    { name: "editorStore" }
  )
);

// 편하게 가져다 쓰기 위한 Hooks
export const useNodes = () => useEditorStore((s) => s.nodes);
export const useSelectedNode = () => 
  useEditorStore((s) => s.selectedNodeId ? s.nodes[s.selectedNodeId] : null);
export const useSelectedNodeId = () => useEditorStore((s) => s.selectedNodeId);
export const useEditorActions = () => ({
  addNode: useEditorStore((s) => s.addNode),
  updateNode: useEditorStore((s) => s.updateNode),
  selectNode: useEditorStore((s) => s.selectNode),
});