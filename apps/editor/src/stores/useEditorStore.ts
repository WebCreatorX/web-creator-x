import { WcxNode } from "@repo/ui/types/nodes.js";
import { CanvasState, Layer } from "@repo/ui/types/rnd.js";
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
          canvas: { dx: 0, dy: 0, scale: 1 },
        },
        (set, get) => ({
          setNode(nodes: WcxNode[]) {
            set((state) => {
              state.nodes = nodes;
            });
          },
          //TODO-노드를 추가/삭제 하는 기능 필요(에디터 섹션에서 노드 추가, 삭제하는 경우 ) -> addNode & deleteNode(자식 노드까지 재귀적으로 삭제 필요!)
          addNode(node: WcxNode) {
            set((state) => {
              state.nodes?.push(node);
            });
          },
          getDescendantIds(nodeId: string): string[] {
            const nodes = get().nodes;
            if (!nodes) return [];

            const res: string[] = [];

            function recursionNode(nodeId: string) {
              res.push(nodeId);
              const childrenNodes = nodes?.filter(
                ({ parent_id }) => parent_id === nodeId,
              );

              if (childrenNodes?.length === 0) return;

              childrenNodes?.forEach(({ id }) => recursionNode(id));
            }

            recursionNode(nodeId);

            return res;
            //TODO- 재귀 삭제 함수로 추출된 노드id는 deleteNodes에 담겨 있다. 이 데이터를 바탕으로 DB수정 시도
          },
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
          //TODO-updateNode는 현재 오직 레이아웃(node.layout)만 변경이 가능하다. -> 액션 이름 수정 필요..?
          updateNodeLayout(targetNodeId: string, updates: Partial<Layer>) {
            set((state) => {
              const targetNode = state.nodes?.find(
                ({ id }) => id === targetNodeId,
              );
              if (targetNode) {
                targetNode.layout = { ...targetNode.layout, ...updates };
              }
            });
          },

          //TODO-노드 상세 데이터 수정하는 액션 추가 필요
          setCanvas(updates: CanvasState) {
            set((state) => {
              state.canvas = { ...state.canvas, ...updates };
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

//TODO-각 커스텀훅 사용 설명 주석 달기
export const useSelectedNodeId = () =>
  useEditorStore((store) => store.selectedNodeId);

export const useSelectNode = () => useEditorStore((store) => store.selectNode);

export const useClearNode = () => useEditorStore((store) => store.clearNode);

export const useCurNodes = () => useEditorStore((store) => store.nodes);

export const useUpdateNodeLayout = () =>
  useEditorStore((store) => store.updateNodeLayout);

export const useCanvas = () => useEditorStore((store) => store.canvas);

export const useSetCanvas = () => useEditorStore((store) => store.setCanvas);

//TODO-매니페스트, 현재 선택된 노드의 레이아웃 상태 구독 훅 추가 필요 -> 오른쪽 사이드 바에서 실시간으로 변경되는 x,y좌표 렌더링 할때 필요

export const useGetDescendantIds = () =>
  useEditorStore((store) => store.getDescendantIds);
