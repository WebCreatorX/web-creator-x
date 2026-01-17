//에디터 모드전용 노드 렌더러 래퍼 컴포넌트
import clsx from "clsx";
import { Rnd } from "react-rnd";
import { BaseNode } from "types";
import { CanvasState, Layer } from "types/rnd";

interface WrapperProps {
  children: React.ReactNode;
  node: BaseNode;
  selectedId: string | null;
  updateNode: (id: string, updates: Partial<Layer>) => void; //노드의 레이아웃 업데이트 함수 from editor의 스토어 액션
  selectNode: (id: string) => void;
  canvas: CanvasState;
}

//에디터 전용 노드 렌더러 래퍼
//래퍼 컴포넌트에서 rnd작업 발생할때 현재 액션이 일어나는 노드 id는 몰라도 될듯? -> 항상 스토어의 selectedId를 기준으로 데이터를 수정하면 된다.
export default function EditorNodeWrapper({
  children,
  node,
  selectedId,
  updateNode,
  selectNode,
  canvas,
}: WrapperProps) {
  const isSelected = selectedId === node.id;
  const wrapperStyle: React.CSSProperties = {
    // 선택되었을 때 시각적 피드백 (테두리 등)
    outline: isSelected ? "outline outline-gray-500 outline-2" : "none",
    cursor: "move",
  };

  const { id } = node;
  const { width, height, x, y } = node.layout;
  const selectedNodeGuideClasses = {
    handle: "bg-white border rounded-full border-gray-500 !w-3 !h-3",
    outline: "ring ring-2 ring-gray-500",
  };

  //TODO- 노드 선택 로직 구현, 선택 ID 공유하는 zustand 스토어 구현 필요

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      scale={canvas.scale}
      onDragStart={(e) => e.stopPropagation()}
      //TODO-일단 이동중에 스토어 업데이트는 미루기 -> 성능 이슈
      // onDrag={(e, d) => updateNode(id, { x: d.x, y: d.y })}
      onDragStop={(e, d) => updateNode(id, { x: d.x, y: d.y })}
      onResizeStart={(e) => e.stopPropagation()}
      //TODO-일단 리사이징중에 스토어 업데이트는 미루기 -> 성능 이슈
      /*
      onResize={(e, dir, ref, delta, pos) =>
        updateNode(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...pos,
        })
      }
       */
      onResizeStop={(e, dir, ref, delta, pos) =>
        updateNode(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...pos,
        })
      }
      enableResizing={isSelected ? undefined : false}
      disableDragging={!isSelected}
      className={clsx("group cursor-pointer", isSelected && "z-50")}
      resizeHandleClasses={{
        bottomLeft: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "-left-1.5 -bottom-1.5")
          : undefined,
        bottomRight: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "-right-1.5 -bottom-1.5")
          : undefined,
        topLeft: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "-left-1.5 -top-1.5")
          : undefined,
        topRight: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "-right-1.5 -top-1.5")
          : undefined,
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          selectNode(id);
        }}
        style={wrapperStyle}
        className={clsx(
          "transition-shadow duration-200",
          isSelected && selectedNodeGuideClasses.outline,
        )}
      >
        {/* 실제 컴포넌트(Hero 등)는 이 안에 렌더링됨 */}
        {children}
      </div>
    </Rnd>
  );
}
