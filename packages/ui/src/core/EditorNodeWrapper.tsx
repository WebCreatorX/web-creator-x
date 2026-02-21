//에디터 모드전용 노드 렌더러 래퍼 컴포넌트
import clsx from "clsx";
import { useDragStore } from "context/dragContext";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { WcxNode } from "types";
import { CanvasState, Layer } from "types/rnd";

interface WrapperProps {
  children: React.ReactNode;
  parentNode: WcxNode | undefined;
  node: WcxNode;
  selectedId: string | null;
  updateNode: (id: string, updates: Partial<Layer>) => void; //노드의 레이아웃 업데이트 함수 from editor의 스토어 액션
  selectNode: (id: string) => void;
  canvas: CanvasState;
  addItemToStack: (draggedId: string, stackId: string) => void;
}

//에디터 전용 노드 렌더러 래퍼
//래퍼 컴포넌트에서 rnd작업 발생할때 현재 액션이 일어나는 노드 id는 몰라도 될듯? -> 항상 스토어의 selectedId를 기준으로 데이터를 수정하면 된다.
export default function EditorNodeWrapper({
  children,
  parentNode,
  node,
  selectedId,
  updateNode,
  selectNode,
  canvas,
  addItemToStack,
}: WrapperProps) {
  const isStackItem = parentNode?.type === "Stack";
  const hasRelativePosition = node.style.position === "relative";

  const isSwitchItems = isStackItem && hasRelativePosition;

  const isSelected = selectedId === node.id;
  const isGroup = node.type === "Group";
  const wrapperStyle: React.CSSProperties = {
    cursor: "move",
  };

  const [isTransformActive, setIsTransformActive] = useState(false);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const { id } = node;
  const { width, height, x, y, zIndex } = node.layout;
  const selectedNodeGuideClasses = {
    // 시각적 핸들은 SelectionOverlay 포탈에서 렌더링.
    // Rnd의 핸들은 인터랙션만 담당 (투명하게 유지)
    handle: "opacity-0 !w-3 !h-3 ",
  };

  // 필요한 데이터만 구독
  const draggingId = useDragStore((s) => s.draggingNodeId);
  const hoveredStackId = useDragStore((s) => s.hoveredStackId);
  const setDraggingId = useDragStore((s) => s.setDraggingId);
  const setHoveredStackId = useDragStore((s) => s.setHoveredStackId);

  //데이터를 바탕으로 가이드 표시 여부 결정
  const isDraggingMyself = draggingId === id;
  const isHoveredStack = hoveredStackId === id;
  const showGuide = isHoveredStack && draggingId && !isDraggingMyself;

  //클릭된 좌표 기준 stack찾는 함수_재귀를 이용해 최상위의 Stack의 id를 반환합니다.
  //TODO-노드 객체만 전달해도 되는거아닌가? -> 일단 노드의 id 반환으로 처리완료.(id vs 객체 반환)
  //클릭된 좌표 기준 stack찾는 함수_재귀를 이용해 최상위의 Stack의 id를 반환합니다.
  function findStackId(e: any) {
    const elements = document.elementsFromPoint(e.clientX, e.clientY);

    for (const element of elements) {
      let curStackNode = element.closest(
        '[data-component-type="Stack"]',
      ) as HTMLElement | null;

      if (!curStackNode) continue;

      // 드래그 중인 노드(=자기 자신)이거나 그 자손인 경우 건너뜁니다
      if (curStackNode.closest(`[data-component-id="${id}"]`)) {
        continue;
      }

      return curStackNode.getAttribute("data-component-id");
    }

    return null;
  }

  //TODO- 노드 선택 로직 구현, 선택 ID 공유하는 zustand 스토어 구현 필요

  return (
    <Rnd

      className={clsx(
        "group cursor-pointer",
        hasRelativePosition && !isTransformActive && "!transform-none", // relative인 경우에는 stack의 정렬을 지키기 위해 transform을 꺼놓는다.
      )}
      size={{ width, height }}
      position={{ x, y }}
      style={{
        ...wrapperStyle,
        position: hasRelativePosition ? "relative" : (node.style.position as any),
        zIndex,
      }}
      scale={canvas.scale}
      onDragStart={(e, d) => {
        e.stopPropagation();
        setDraggingId(id); //드래그 시작 알림
        if (hasRelativePosition) {
          const { offsetLeft, offsetTop } = d.node;
          updateNode(id, { x: offsetLeft, y: offsetTop });
          setDragPosition({ x: offsetLeft, y: offsetTop });
          setIsTransformActive(true);
          console.log(
            `좌표 보정 작동 offsetLeft - ${offsetLeft} // offsetTop - ${offsetTop} `,
          );
        }
      }}
      //TODO-이동중에 로직 실행하면 성능상 부담이 될 수 있다... 최적화 고민 해보기
      onDrag={(e, d) => {
        const stackId = findStackId(e);

        if (stackId !== hoveredStackId) {
          setHoveredStackId(stackId);
        }
      }}
      onDragStop={(e, d) => {
        setIsTransformActive(false);
        console.log(`현재 노드 ${id}- 포지션 ${node.style.position}`);
        const stackId = findStackId(e);

        setDraggingId(null);
        setHoveredStackId(null);

        console.log(
          `드래그 종료시 노드의 좌표 x:${d.node.offsetLeft}, y:${d.node.offsetTop}`,
        );

        if (hasRelativePosition) {
          console.log("relative position");
          return;
        }

        //드래그가 종료될 경우에 외부 아이템이 스택으로 들어오는경우,스택 내부의 아이템이 이동할 경우(포지션 앱솔루트), 내부 아이템끼리 위치 이동할 경우,기본 위치 이동을 생각해야한다.
        if (isSwitchItems) {
          //현재 놓인 Y위치에 따라서 노드의 순서 변경을 고려해야한다.
          //TODO-Stack내부에서 Item 노드의 순서 변경 로직 실행
        } else if (stackId && node.parent_id !== stackId) {
          //스택 외부의 노드가 스택 안으로 새롭게 들어오는 경우에만 해당이 된다.
          addItemToStack(id, stackId);
        } else {
          updateNode(id, { x: d.x, y: d.y });
        }
      }}
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
          ...(hasRelativePosition ? {} : pos),
        })
      }
      enableResizing={isGroup ? undefined : isSelected ? undefined : false}
      disableDragging={!isSelected}
      resizeHandleClasses={{
        bottomLeft: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "!-left-1 !-bottom-1")
          : undefined,
        bottomRight: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "!-right-1 !-bottom-1")
          : undefined,
        topLeft: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "!-left-1 !-top-1")
          : undefined,
        topRight: isSelected
          ? clsx(selectedNodeGuideClasses.handle, "!-right-1 !-top-1")
          : undefined,
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          selectNode(id);
        }}
        style={wrapperStyle}
        className="relative h-full w-full"
      >
        {children}
      </div>
    </Rnd>
  );
}
