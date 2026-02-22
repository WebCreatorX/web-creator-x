/**
 * 사이징 모드 전환 시 값 변환 관련 순수 유틸리티 함수들.
 * React/Store 의존 없음 — 테스트 용이.
 */

export type SizingMode = "fixed" | "fill" | "fit" | "relative";

/**
 * DOM에서 노드의 실제 렌더링 크기를 읽어옵니다 (canvas scale 보정 포함).
 */
export function getComputedNodeSize(nodeId: string, scale: number) {
  const el = document.querySelector(`[data-component-id="${nodeId}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { width: rect.width / scale, height: rect.height / scale };
}

/**
 * 부모의 content-box 크기를 계산합니다 (padding 제외).
 */
export function getParentContentSize(parentId: string | null, scale: number) {
  if (!parentId) return null;
  const el = document.querySelector(`[data-component-id="${parentId}"]`);
  if (!el) return null;
  const computed = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return {
    width:
      rect.width / scale -
      parseFloat(computed.paddingLeft) -
      parseFloat(computed.paddingRight),
    height:
      rect.height / scale -
      parseFloat(computed.paddingTop) -
      parseFloat(computed.paddingBottom),
  };
}

export interface ConvertSizingParams {
  oldValue: number;
  oldMode: SizingMode;
  newMode: SizingMode;
  isHeight: boolean;
  nodeId: string;
  parentId: string | null;
  scale: number;
}

/**
 * 모드 전환 시 값을 자동 변환합니다.
 * DOM에서 현재 노드의 실제 렌더링 크기를 읽어와서 정확한 변환을 수행합니다.
 *
 * - → fill: 항상 1 (1fr)
 * - → fit: 기존 값 유지 (입력 비활성)
 * - → fixed: DOM 렌더링 크기 스냅
 * - → relative: (현재크기 / 부모크기) × 100
 */
export function convertSizingValue({
  oldValue,
  oldMode,
  newMode,
  isHeight,
  nodeId,
  parentId,
  scale,
}: ConvertSizingParams): number {
  if (oldMode === newMode) return oldValue;
  if (newMode === "fill") return 1;
  if (newMode === "fit") return oldValue;

  // → fixed로 전환: DOM에서 현재 렌더링 크기 읽기
  if (newMode === "fixed") {
    const size = getComputedNodeSize(nodeId, scale);
    if (size) {
      return Math.round(isHeight ? size.height : size.width);
    }
    return oldValue; // DOM 접근 실패 시 폴백
  }

  // → relative로 전환: DOM에서 현재 크기 + 부모 content-box 기준 계산
  if (newMode === "relative") {
    const size = getComputedNodeSize(nodeId, scale);
    const parentContent = getParentContentSize(parentId, scale);
    if (size && parentContent) {
      const childPx = isHeight ? size.height : size.width;
      const parentPx = isHeight ? parentContent.height : parentContent.width;
      return parentPx > 0 ? Math.round((childPx / parentPx) * 100) : 100;
    }
    return oldValue; // 폴백
  }

  return oldValue;
}
