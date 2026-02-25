"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasState } from "types/rnd";

interface SelectionOverlayProps {
  selectedNodeId: string | null;
  canvas: CanvasState;
}

interface OverlayRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 포탈 기반 선택 오버레이 컴포넌트
 *
 * 노드 DOM 트리 바깥에 렌더링되어 부모의 overflow:hidden 등에 의해
 * 선택 테두리가 잘리는 문제를 근본적으로 해결합니다.
 *
 * - data-component-id 속성으로 대상 노드 DOM 요소를 탐색
 * - getBoundingClientRect()로 화면 좌표를 얻어 캔버스 좌표계로 변환
 * - ResizeObserver로 크기/위치 변화를 실시간 감지
 */
export default function SelectionOverlay({
  selectedNodeId,
  canvas,
}: SelectionOverlayProps) {
  const [rect, setRect] = useState<OverlayRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!selectedNodeId) {
      setRect(null);
      return;
    }

    // 선택된 노드의 DOM 요소 찾기 (Rnd 래퍼가 아닌 내부 컴포넌트)
    const nodeEl = document.querySelector(
      `[data-component-id="${selectedNodeId}"]`,
    ) as HTMLElement | null;

    if (!nodeEl) {
      setRect(null);
      return;
    }

    function updateRect() {
      if (!nodeEl || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const nodeRect = nodeEl.getBoundingClientRect();

      // 컨테이너(포탈 레이어) 기준 상대 좌표로 변환
      // 포탈 레이어는 캔버스 transform 안에 있으므로 scale이 이미 적용됨.
      // getBoundingClientRect()는 scale이 적용된 화면 좌표를 반환하므로,
      // 캔버스 좌표계로 변환하려면 scale로 나눠야 함.
      setRect({
        x: (nodeRect.left - containerRect.left) / canvas.scale,
        y: (nodeRect.top - containerRect.top) / canvas.scale,
        width: nodeRect.width / canvas.scale,
        height: nodeRect.height / canvas.scale,
      });
    }

    // 초기 위치 계산 (다음 프레임에서 실행하여 렌더링 완료 보장)
    rafRef.current = requestAnimationFrame(updateRect);

    // ResizeObserver로 크기/위치 변화 감지
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateRect);
    });
    resizeObserver.observe(nodeEl);

    // MutationObserver로 style/transform 변화 감지 (드래그 시)
    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateRect);
    });

    // Rnd 래퍼(부모)의 transform 변화를 감지하기 위해 부모 요소도 관찰
    const rndWrapper = nodeEl.closest(".react-draggable") as HTMLElement | null;
    if (rndWrapper) {
      mutationObserver.observe(rndWrapper, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    // nodeEl 자체의 변화도 관찰
    mutationObserver.observe(nodeEl, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [selectedNodeId, canvas.scale]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 9999 }}
    >
      {rect && selectedNodeId && (
        <div
          className="absolute ring-2 ring-rnd-handle rounded-[1px]"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
          }}
        >
          {/* 리사이즈 핸들 (4 corners) — 시각적 표시 전용, 인터랙션은 Rnd가 담당 */}
          <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full border-2 border-rnd-handle bg-white" />
          <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-rnd-handle bg-white" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full border-2 border-rnd-handle bg-white" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full border-2 border-rnd-handle bg-white" />
        </div>
      )}
    </div>
  );
}
