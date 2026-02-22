/**
 * 사이징 모드 드롭다운 옵션 생성 — 금지 조합 판단 포함.
 */

import type { SizingMode } from "./sizingConversion";

interface SizingModeOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Width 또는 Height 모드 선택 옵션을 생성합니다.
 *
 * 금지 조합:
 * - 부모가 fit → fill/relative 비활성 (비율 기준이 없음)
 * - 부모가 Stack이 아님 → fill 비활성 (flex-grow는 Stack에서만 유효)
 */
export function getSizingModeOptions(params: {
  parentMode: SizingMode;
  isInStack: boolean;
}): SizingModeOption[] {
  const { parentMode, isInStack } = params;

  return [
    { label: "Fixed", value: "fixed" },
    { label: "Rel", value: "relative", disabled: parentMode === "fit" },
    { label: "Fill", value: "fill", disabled: parentMode === "fit" || !isInStack },
    { label: "Fit", value: "fit" },
  ];
}
