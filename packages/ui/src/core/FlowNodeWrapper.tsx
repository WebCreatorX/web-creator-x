/**
 * FlowNodeWrapper — Stack 내부 flow 아이템 전용 래퍼 (Rnd 미사용)
 *
 * resolveSizeStyle로 CSS 크기를 제어합니다.
 * fill / fit / fixed / relative 모드를 지원합니다.
 */
import { WcxNode } from "types";
import { CanvasState, Layer } from "types/rnd";
import resolveSizeStyle from "utils/resolveSizeStyle";

interface FlowWrapperProps {
  children: React.ReactNode;
  node: WcxNode;
  parentNode: WcxNode | undefined;
  selectedId: string | null;
  updateNode: (id: string, updates: Partial<Layer>) => void;
  selectNode: (id: string) => void;
  canvas: CanvasState;
}

type StackDirection = "row" | "column";

export default function FlowNodeWrapper({
  children,
  node,
  parentNode,
  selectedId,
  selectNode,
  canvas,
}: FlowWrapperProps) {
  const { id } = node;

  // 부모 Stack의 direction 결정
  const parentDirection: StackDirection =
    parentNode?.type === "Stack"
      ? (parentNode.props.direction ?? "column")
      : "column";

  // widthMode/heightMode → CSS로 변환
  const sizeStyle = resolveSizeStyle(node.layout, parentDirection);

  // 빈 fit 컨테이너 placeholder: 최소 크기 확보
  const isFitWidth = node.layout.widthMode === "fit";
  const isFitHeight = node.layout.heightMode === "fit";
  const placeholderStyle: React.CSSProperties = {};
  if (isFitWidth) placeholderStyle.minWidth = 20;
  if (isFitHeight) placeholderStyle.minHeight = 20;

  return (
    <div
      data-component-id={id}
      data-flow-wrapper
      style={{
        ...sizeStyle,
        ...placeholderStyle,
        position: "relative",
        zIndex: node.layout.zIndex,
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          selectNode(id);
        }}
        style={{ cursor: "pointer" }}
        className="relative h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}
