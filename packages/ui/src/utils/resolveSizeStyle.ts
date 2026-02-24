import { CSSProperties } from "react";

type SizingMode = "fixed" | "fill" | "fit" | "relative";
type StackDirection = "row" | "column";

interface LayoutInput {
  width: number | string;
  height: number | string;
  widthMode: SizingMode;
  heightMode: SizingMode;
}

/**
 * widthMode/heightMode를 실제 CSS 속성으로 변환합니다.
 *
 * Stack 내부의 flow 아이템에서 사용됩니다.
 * 주축(main axis)과 교차축(cross axis)에서 fill/fit의 동작이 다릅니다.
 *
 * @param layout 노드의 layout 데이터
 * @param parentDirection 부모 Stack의 방향 (row | column)
 */
export default function resolveSizeStyle(
  layout: LayoutInput,
  parentDirection: StackDirection = "column",
): CSSProperties {
  const style: CSSProperties = {};

  // width 처리
  const isWidthMainAxis = parentDirection === "row";
  Object.assign(
    style,
    resolveAxis(layout.widthMode, layout.width, isWidthMainAxis, "width"),
  );

  // height 처리
  const isHeightMainAxis = parentDirection === "column";
  Object.assign(
    style,
    resolveAxis(layout.heightMode, layout.height, isHeightMainAxis, "height"),
  );

  return style;
}

function resolveAxis(
  mode: SizingMode,
  value: number | string,
  isMainAxis: boolean,
  dimension: "width" | "height",
): CSSProperties {
  const numValue = typeof value === "number" ? value : parseFloat(value) || 0;

  switch (mode) {
    case "fixed":
      return { [dimension]: `${numValue}px` };

    case "relative":
      return { [dimension]: `${numValue}%` };

    case "fill":
      if (isMainAxis) {
        // 주축: flex-grow로 남은 공간 분배
        // flexBasis: 0 → 콘텐츠 크기와 무관하게 균등 분배
        // minWidth/minHeight: 0 → 콘텐츠 오버플로우 방지
        return {
          flexGrow: numValue || 1,
          flexBasis: 0,
          flexShrink: 1,
          [`min${capitalize(dimension)}`]: 0,
        };
      } else {
        // 교차축: stretch로 부모 너비에 맞추기
        return {
          alignSelf: "stretch" as const,
          [`min${capitalize(dimension)}`]: 0,
        };
      }

    case "fit":
      if (isMainAxis) {
        // 주축: 콘텐츠 크기 유지, 압축/확장 방지
        return {
          flexGrow: 0,
          flexShrink: 0,
        };
      } else {
        // 교차축: fit-content로 콘텐츠 크기
        return {
          [dimension]: "fit-content",
        };
      }

    default:
      return { [dimension]: `${numValue}px` };
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
