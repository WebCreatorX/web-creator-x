"use client";

import { useDragStore } from "@/stores/useDragStore";
import {
  useAddItemToStack,
  useCanvas,
  useClearNode,
  useCurNodes,
  useSelectedNodeId,
  useSelectNode,
  useSetCanvas,
  useUpdateNodeLayout,
} from "@/stores/useEditorStore";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "@/utils/editor/canvasMouseHandler";
import handleWheel from "@/utils/editor/handleWheel";
import { DragProvider } from "@repo/ui/context/dragContext";
import EditorNodeWrapper from "@repo/ui/core/EditorNodeWrapper";
import NodeRenderer from "@repo/ui/core/NodeRenderer";
import SelectionOverlay from "@repo/ui/core/SelectionOverlay";
import { WcxNode } from "@repo/ui/types/nodes";
import React, { useRef } from "react";

export default function Canvas() {
  const nodes = useCurNodes();
  const selectedNodeId = useSelectedNodeId();
  const selectNode = useSelectNode();
  const updateNode = useUpdateNodeLayout();
  const canvasState = useCanvas();
  const setCanvas = useSetCanvas();
  const clearNode = useClearNode();
  const addItemToStack = useAddItemToStack();

  //TODO-이거 뭐임?
  const isPanning = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  function getParentNode(parentId: string | null): WcxNode | undefined {
    if (!parentId) return undefined;

    return nodes?.find((n) => n.id === parentId);
  }

  //FIXME-각 노드들에 key속성 추가해주기. -> 리액트 경고 발생
  //FIXME-nodes가 비어있는 상황에서 에러발생. -> Base Condition에 Root가 들어간다.(Root는 단지 더미 노드일뿐 로직에 들어가면 안된다.)
  /**
   *
   * @param parentNode 부모 노드 객체
   * @returns 부모 노드 트리 구조
   *
   * parentNode만 주면 NodeTree함수가 알아서 ParentNode의 자식 노드 객체 배열(WcxNode[])을 찾아준다.
   */
  function renderTree(parentNode: WcxNode | { id: null }) {
    //parentNode의 자식 찾기
    const childrenObjArr = nodes?.filter(
      ({ parent_id }) => parent_id === parentNode.id,
    );

    //BaseCondition
    //FIXME-솔직히 !childrenArr만 있어도 될듯? 길이가 0일 수가 없다.
    if (!childrenObjArr || childrenObjArr.length === 0) {
      if (parentNode.id === null) return;
      return (
        <EditorNodeWrapper
          node={parentNode}
          parentNode={getParentNode(parentNode.parent_id)}
          selectedId={selectedNodeId}
          updateNode={updateNode}
          selectNode={selectNode}
          canvas={canvasState}
          addItemToStack={addItemToStack}
        >
          <NodeRenderer node={parentNode} />
        </EditorNodeWrapper>
      );
    }

    // 1. 자식들의 렌더링 결과물 (JSX 배열)
    //현재 parentNode에 대해 NodeRenderer를 사용하려면 children이 필요한데, 재귀로 구해준다.
    const children = childrenObjArr.map((node) => {
      return <React.Fragment key={node.id}>{renderTree(node)}</React.Fragment>;
    });

    // 2. [예외 처리] Root 노드인 경우 -> 그냥 자식들만 반환 (Wrapper 없음)
    if (parentNode.id === null) {
      return <>{children}</>;
    }

    // 3. 일반 노드인 경우 -> Wrapper + NodeRenderer + children
    return (
      <EditorNodeWrapper
        node={parentNode}
        parentNode={getParentNode(parentNode.parent_id)}
        selectedId={selectedNodeId}
        updateNode={updateNode}
        selectNode={selectNode}
        canvas={canvasState}
        addItemToStack={addItemToStack}
      >
        <NodeRenderer node={parentNode}>{children}</NodeRenderer>
      </EditorNodeWrapper>
    );
  }

  return (
    <div
      data-component-type="canvas"
      className="relative h-full w-full flex-1 cursor-grab overflow-hidden bg-white active:cursor-grabbing"
      onWheel={(e) => handleWheel({ canvas: canvasState, e, setCanvas })}
      onMouseDown={(e) =>
        handleMouseDown({ e, isPanning, lastMousePos, clearNode })
      }
      onMouseMove={(e) =>
        handleMouseMove({ e, isPanning, lastMousePos, setCanvas, canvasState })
      }
      onMouseUp={() => handleMouseUp({ isPanning })}
      onMouseLeave={() => handleMouseUp({ isPanning })}
    >
      <div
        style={{
          transform: `translate(${canvasState.dx}px, ${canvasState.dy}px) scale(${canvasState.scale})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
        }}
        className="relative h-full w-full"
      >
        {/* 배경 격자 (Helper Grid) */}
        <div className="bg-grid-pattern pointer-events-none absolute inset-[-1000%] z-0 h-[3000%] w-[3000%]" />
        <div className="relative z-10 h-full w-full">
          {/* 실제 스토어 인스턴스를 주입 */}
          <DragProvider value={useDragStore}>
            {renderTree({ id: null })}
          </DragProvider>
          {/* 포탈 기반 선택 오버레이 — 노드 DOM 트리 바깥에서 렌더링 */}
          <SelectionOverlay
            selectedNodeId={selectedNodeId}
            canvas={canvasState}
          />
        </div>
      </div>
    </div>
  );
}
