import { CSSProperties } from "react";
import { NodeStyle } from "types";

/**
 * 노드 스타일 처리 (간소화)
 *
 * - className은 제외하고 CSS 속성만 반환
 * - 레이아웃 속성(width, height 등)은 EditorNodeWrapper가 담당하므로 필터링
 *
 * @param style 노드의 style 객체
 * @returns CSS 속성만 포함된 객체 (className 제외, 레이아웃 속성 제외)
 */
export default function processNodeStyles(style: NodeStyle): CSSProperties {
  // EditorNodeWrapper가 제어하는 레이아웃 속성 목록
  const LAYOUT_PROPERTIES = new Set([
    "width",
    "height",
    "position",
    "top",
    "bottom",
    "left",
    "right",
    "zIndex",
    "transform",
  ]);

  // className 제거
  const { className, ...cssProps } = style;

  // 레이아웃 속성 필터링
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(cssProps)) {
    if (!LAYOUT_PROPERTIES.has(key) && value !== undefined) {
      result[key] = value;
    }
  }

  // shorthand(padding)와 longhand(paddingTop 등)가 동시에 존재하면
  // React가 경고를 띄우므로, longhand가 있으면 shorthand를 제거
  const hasLonghandPadding =
    "paddingTop" in result ||
    "paddingRight" in result ||
    "paddingBottom" in result ||
    "paddingLeft" in result;
  if (hasLonghandPadding && "padding" in result) {
    delete result.padding;
  }

  return result as CSSProperties;
}
