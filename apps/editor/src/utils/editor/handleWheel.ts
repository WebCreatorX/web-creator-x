import { CanvasState } from "@repo/ui/types/rnd";

interface handleWheelParam {
  e: React.WheelEvent;
  canvas: CanvasState;
  setCanvas: (updates: Partial<CanvasState>) => void;
}

export default function handleWheel({
  e,
  canvas,
  setCanvas,
}: handleWheelParam) {
  // 1. "컨트롤 키(Win)나 커맨드 키(Mac)를 누른 채" 휠을 돌렸나?
  if (e.ctrlKey || e.metaKey) {
    // -> 줌(Zoom) 모드
    e.preventDefault();

    //마우스가 너무 예민해서, 그 값을 1/1000로 확 줄여서 조금씩만 줌인/줌아웃 되도록 조절해 주는 안전장치.
    const zoomSensitivity = 0.0001;

    // 계산된 새로운 배율로 업데이트
    const newScale = Math.min(
      Math.max(0.1, canvas.scale - e.deltaY * zoomSensitivity),
      5,
    );
    setCanvas({ scale: newScale });
  } else {
    // 2. 키 안 누르고 그냥 휠만 돌렸나?
    // -> 이동(Pan) 모드.
    //스크롤을 생각하면 안되고, 캔버스의 transform을 생각해야한다! -> 이동 시키는 것!
    setCanvas({
      dx: canvas.dx - e.deltaX,
      dy: canvas.dy - e.deltaY,
    });
  }
}
