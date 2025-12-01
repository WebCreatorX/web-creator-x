import { CSSProperties } from "react";
import { NodeStyle, NodeStyleKey } from "types";
import applyStyles from "./applyStyles";

/**
 *
 * @param style 평탄화 되지 않은 노드의 스타일 객체
 * @returns 노드의 하위 요소들에 대한 스타일이 css객체로 변환된 객체
 *
 * 상위 노드객체를 받아서 각 키(노드의 내부 요소들)에 해당하는 스타일을 적용하고 CSSProperties 객체로 변환하는 역할을 수행.
 * 최종적으로 각 하위 요소별 스타일이 CSSProperties 객체로 매핑된 객체를 반환.
 * 이때 하위 요소별 스타일객체는 평탄화 되어있습니다.
 */
export default function processNodeStyles(style: NodeStyle) {
  const nodeStyleObj: Partial<Record<NodeStyleKey, CSSProperties>> = {};
  Object.entries(style).forEach(([key, value]) => {
    if (!value) return;
    const styleKey = key as NodeStyleKey;
    nodeStyleObj[styleKey] = applyStyles(value);
  });

  return nodeStyleObj;
}
