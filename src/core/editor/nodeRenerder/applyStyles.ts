//참고 자료->https://www.notion.so/Object-assign-2b175c9287fa8077b766de146b87a7e2?source=copy_link
//추후 성능 개선 필요(메모이제이션)
import { NodeStyle } from "../types";

/**
 *
 * @param styleData 노드의 style 데이터: JsonB형태
 *
 * 카테고리별로 중첩되어 있는 스타일 데이터를 평탄화.
 */
function applyStyles(styleData: NodeStyle) {
  if (!styleData) return;

  const combinedStyles = {};
  for (const key in styleData) {
    //카테고리별로 중첩된 스타일 데이터를 평탄화 시킴.
    if (key !== "className" && typeof styleData[key] === "object") {
      Object.assign(combinedStyles, styleData[key]);
    }
  }

  // ... (다른 특수 CSS 속성 변환 로직 추후 구현) ...

  return combinedStyles;
}
