//에디터 모드전용 노드 렌더러 래퍼 컴포넌트
import { BaseNode } from "types";

interface WrapperProps {
  children: React.ReactNode;
  node: BaseNode;
  isSelected: boolean;
  onDragStart: (e: React.MouseEvent, id: string) => void;
}

export default function DraggableNodeWrapper({
  children,
  node,
  isSelected,
  onDragStart,
}: WrapperProps) {
  const wrapperStyle: React.CSSProperties = {
    position: "absolute", // 핵심: 캔버스 내에서 자유 배치
    left: node["layout"].x,
    top: node["layout"].y,
    width: node["layout"].width,
    height: node["layout"].height,
    zIndex: node["layout"].zIndex,

    // 선택되었을 때 시각적 피드백 (테두리 등)
    outline: isSelected ? "2px solid blue" : "none",
    cursor: "move",
  };

  return (
    <div
      style={wrapperStyle}
      onMouseDown={(e) => onDragStart(e, node.id)}
      className="" //TODO - 필요시 클래스네임 추가(dnd상황에서 스타일 강조 등)
    >
      {/* 실제 컴포넌트(Hero 등)는 이 안에 렌더링됨 */}
      {children}

      {/* 리사이즈 핸들 등은 에디터 모드에서만 오버레이로 표시 */}
      {/* TODO-추후 호버시 리사이즈 핸들 렌더링 하도록 수정 필요! */}
      {isSelected && (
        <>
          <div className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize bg-blue-500" />
          {/* TODO-기타 리사이즈 핸들들 렌더링은 이곳에서 ... */}
        </>
      )}
    </div>
  );
}
