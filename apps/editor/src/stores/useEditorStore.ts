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
          nodes: null as null | WcxNode[], //TODO- 추후에 현재 페이지에 해당하는 노드들을 받아오는 로직을 통해 해당 상태가 업데이트 되야 한다. -> EditorStoreInitializer컴포넌트에서 담당
          canvas: { dx: 0, dy: 0, scale: 1 },
          selectedDepthPath: [] as string[],
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
          deleteNode(nodeId: string) {
            set((state) => {
              if (!state.nodes) return;
              const targetNodeIdx = state.nodes?.findIndex(
                (node) => node.id === nodeId,
              );
              if (targetNodeIdx === -1) return;
              state.nodes.splice(targetNodeIdx, 1);
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

          //FIXME-🐛 버그 발견! -> 하위 노드에서 다른 가지로 넘어갈때 다시 상위 노드가 선택되는 버그 발견. 같은 계층의 자식 노드로 가지를 옮기려면 바로 선택될 수 있어야한다.
          selectNode(targetNodeId: string) {
            const path = get().selectedDepthPath;
            const nodes = get().nodes;
            if (!nodes) return;

            while (true) {
              const targetNode = nodes.find((node) => node.id === targetNodeId);
              if (!targetNode) return;
              const parentNodeId = targetNode.parent_id;

              if (parentNodeId === null) {
                set((state) => {
                  state.selectedDepthPath = [targetNodeId];
                });
                break;
              }

              const parentPos = path.indexOf(parentNodeId);

              if (parentPos !== -1) {
                set((state) => {
                  state.selectedDepthPath.splice(parentPos + 1);
                  state.selectedDepthPath.push(targetNodeId);
                });
                break;
              }
              targetNodeId = parentNodeId;
            }
          },
          clearNode() {
            set(
              (state) => {
                state.selectedDepthPath = [];
              },
              false,
              "editorStore/clearNode",
            );
          },
          /**
           * 노드의 레이아웃(위치, 크기)을 업데이트합니다.
           * @param targetNodeId - 업데이트할 노드의 ID
           * @param updates - 변경할 레이아웃 속성 (Partial<Layer>)
           */
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

          /**
           * 노드의 모든 속성(props, style 등)을 통합 업데이트합니다.
           * style, props는 얕은 병합(shallow merge)을 수행합니다.
           * @param targetNodeId - 대상 노드 ID
           * @param updates - 업데이트할 속성 객체
           */
          updateNode(targetNodeId: string, updates: Partial<WcxNode>) {
            set((state) => {
              const targetNode = state.nodes?.find(
                ({ id }) => id === targetNodeId,
              );
              if (!targetNode) return;

              // 1. 최상위 속성 업데이트 (type 등)
              // (주의: 객체 타입인 style, props, layout을 통째로 덮어쓰지 않도록 별도 처리)
              const { style, props, layout: _layout, ...rest } = updates;
              Object.assign(targetNode, rest);

              // 2. 하위 객체 병합 업데이트
              if (style) {
                targetNode.style = { ...targetNode.style, ...style };
              }
              if (props) {
                targetNode.props = { ...targetNode.props, ...props };
              }
            });
          },

          //TODO-노드 상세 데이터 수정하는 액션 추가 필요
          setCanvas(updates: Partial<CanvasState>) {
            set((state) => {
              state.canvas = { ...state.canvas, ...updates };
            });
          },

          //TODO-'Node참조값 전달' vs nodeId 전달후 스코프 안에서 파싱 고민해보기
          addItemToStack: (nodeId: string, stackId: string) =>
            set((state) => {
              if (!state.nodes) return state;
              const node = state.nodes.find((n) => n.id === nodeId);
              const stack = state.nodes.find((n) => n.id === stackId);
              if (!node || !stack || stack.type !== "Stack") {
                return state;
              }

              // Stack의 현재 items
              //Stack노드의 하위 자식들을 'position'Props에 따라 오름차순 정렬
              const currentItems = state.nodes
                .filter((n) => n.parent_id === stackId)
                .sort((a, b) => a.position - b.position);

              //오름차순 정렬후 마지막 idx 배정
              const insertIndex = currentItems.length;
              // insertIndex 이후의 items position 업데이트
              node.position = insertIndex;
              node.parent_id = stackId;
              node.style.position = "relative";
            }),
        }),
      ),
    ),
    {
      name: "editorStore",
    },
  ),
);

// ------------------------------------------------------------------
// Custom Hooks w/ JSDoc
// ------------------------------------------------------------------

/**
 * [Action] 캔버스의 노드 리스트를 초기화(설정)하는 함수를 반환합니다.
 * @example
 * const setNode = useSetNode();
 * setNode(initialNodes);
 */
export const useSetNode = () => useEditorStore((store) => store.setNode);

/**
 * [Action] 새로운 노드를 추가하는 함수를 반환합니다.
 * @example
 * const addNode = useAddNode();
 * addNode(newNodeObject);
 */
export const useAddNode = () => useEditorStore((store) => store.addNode);

/**
 * [Action] 특정 노드를 삭제하는 함수를 반환합니다.
 * @param nodeId - 삭제할 노드의 ID
 */
export const useDeleteNode = () => useEditorStore((store) => store.deleteNode);

/**
 * [Selector] 현재 선택된 노드의 ID를 반환합니다.
 * 선택된 노드가 없으면 null을 반환합니다.
 */
export const useSelectedNodeId = () =>
  useEditorStore((store) => {
    const path = store.selectedDepthPath;
    return path.length > 0 ? path[path.length - 1] : null;
  });

/**
 * [Action] 특정 노드를 선택(포커스)하는 함수를 반환합니다.
 * @param id - 선택할 노드의 ID
 */
export const useSelectNode = () => useEditorStore((store) => store.selectNode);

/**
 * [Action] 현재 선택된 노드 해제(선택 취소)하는 함수를 반환합니다.
 */
export const useClearNode = () => useEditorStore((store) => store.clearNode);

/**
 * [Selector] 현재 캔버스의 모든 노드 배열을 반환합니다.
 * 노드가 없으면 null을 반환합니다.
 */
export const useCurNodes = () => useEditorStore((store) => store.nodes);

/**
 * [Action] 노드의 레이아웃(x, y, w, h 등)만을 빠르게 업데이트할 때 사용합니다.
 * 드래그 앤 드롭 등 퍼포먼스가 중요한 경우 적합합니다.
 */
export const useUpdateNodeLayout = () =>
  useEditorStore((store) => store.updateNodeLayout);

/**
 * [Action] 노드의 모든 속성(style, props)을 범용적으로 업데이트합니다.
 * 속성 패널(Right Sidebar)에서 값을 수정할 때 사용하기 적합합니다.
 */
export const useUpdateNode = () => useEditorStore((store) => store.updateNode);

/**
 * [Selector] 캔버스의 뷰포트 상태(pan, scale)를 반환합니다.
 */
export const useCanvas = () => useEditorStore((store) => store.canvas);

/**
 * [Action] 캔버스의 뷰포트 상태(pan, scale)를 업데이트합니다.
 */
export const useSetCanvas = () => useEditorStore((store) => store.setCanvas);

/**
 * [Helper] 특정 노드의 모든 자손(Children) ID 배열을 가져오는 함수를 반환합니다.
 * 재귀적으로 탐색합니다.
 */
export const useGetDescendantIds = () =>
  useEditorStore((store) => store.getDescendantIds);
