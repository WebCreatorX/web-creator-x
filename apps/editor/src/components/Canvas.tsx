import {
  useCanvas,
  useCurNodes,
  useSelectedNodeId,
  useSelectNode,
  useUpdateNode,
} from "@/stores/useEditorStore";
import EditorNodeWrapper from "@repo/ui/core/EditorNodeWrapper.jsx";
import NodeRenderer from "@repo/ui/core/NodeRenderer.jsx";
import { WcxNode } from "@repo/ui/types/nodes.js";
import React from "react";

export default function Canvas() {
  const nodes = useCurNodes();
  const selectedNodeId = useSelectedNodeId();
  const selectNode = useSelectNode();
  const updateNode = useUpdateNode();
  const canvasState = useCanvas();

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
          selectedId={selectedNodeId}
          updateNode={updateNode}
          selectNode={selectNode}
          canvas={canvasState}
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
        selectedId={selectedNodeId}
        updateNode={updateNode}
        selectNode={selectNode}
        canvas={canvasState}
      >
        <NodeRenderer node={parentNode}>{children}</NodeRenderer>
      </EditorNodeWrapper>
    );
  }

  return <div className="canvas-root relative">{renderTree({ id: null })}</div>;
}
