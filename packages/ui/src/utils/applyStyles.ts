//참고 자료->https://www.notion.so/Object-assign-2b175c9287fa8077b766de146b87a7e2?source=copy_link
//TODO-추후 성능 개선 필요(메모이제이션)
import { CSSProperties } from "react";
import { ElementStyle } from "../types/styles";

/**
 *
 * @param styleData 노드의 style 데이터: JsonB형태
 *
 * 카테고리별로 중첩되어 있는 스타일 데이터를 평탄화하여 인라인 문자열로 반환한다.
 * 해당 반환값을 바로 style속성의 값으로 삽입할 수 있다.
 *
 */
export default function applyStyles(
  styleData: ElementStyle,
): CSSProperties | undefined {
  if (!styleData) return;

  const combinedStyles: Record<string, any> = {};

  // Wrapper(부모)가 제어해야 할 레이아웃 속성 목록 (블랙리스트)
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
    "margin", // 마진도 레이아웃에 영향을 주므로 제외하는 것이 안전함
  ]);

  for (const key in styleData) {
    //카테고리별로 중첩된 스타일 데이터를 평탄화 시킴.
    //⭐️ className은 평탄화 작업에서 안전하게 제외합니다.
    if (key !== "className" && typeof styleData[key] === "object") {
      const categoryStyles = styleData[key] as Record<string, any>;
      
      for (const styleKey in categoryStyles) {
        // 레이아웃 속성이면 건너뜀 (Wrapper가 담당)
        if (LAYOUT_PROPERTIES.has(styleKey)) continue;
        
        combinedStyles[styleKey] = categoryStyles[styleKey];
      }
    }
  }

  return combinedStyles;
}
