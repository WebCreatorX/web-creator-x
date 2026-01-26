//캔버스 위젯에서 발생하는 마우스 이벤트를 다루는 유틸리티 함수 파일입니다.

import { CanvasState } from "@repo/ui/types/rnd";

type IsPanning = React.RefObject<boolean>;
type LastMousePos = React.RefObject<{ x: number; y: number }>;

interface handleMouseDown {
  e: React.MouseEvent;
  isPanning: IsPanning;
  lastMousePos: LastMousePos;
  selectNode: (id: string | null) => void;
}

interface handleMouseMove {
  e: React.MouseEvent;
  isPanning: IsPanning;
  lastMousePos: LastMousePos;
  setCanvas: (updates: Partial<CanvasState>) => void;
  canvasState: {
    dx: number;
    dy: number;
    scale: number;
  };
}

export function handleMouseDown({
  e,
  isPanning,
  lastMousePos,
  selectNode,
}: handleMouseDown) {
  if (e.button === 0) {
    selectNode(null);
    return;
  }
  e.preventDefault();
  isPanning.current = true;
  lastMousePos.current = {
    x: e.clientX,
    y: e.clientY,
  };
}

export function handleMouseUp({ isPanning }: { isPanning: IsPanning }) {
  isPanning.current = false;
}

export function handleMouseMove({
  e,
  isPanning,
  lastMousePos,
  setCanvas,
  canvasState,
}: handleMouseMove) {
  if (!isPanning.current) return;
  const deltaX = e.clientX - lastMousePos.current.x;
  const deltaY = e.clientY - lastMousePos.current.y;
  setCanvas({ dx: canvasState.dx + deltaX, dy: canvasState.dy + deltaY });
  lastMousePos.current = { x: e.clientX, y: e.clientY };
}
