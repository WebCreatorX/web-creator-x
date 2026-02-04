import { CSSProperties } from "react";

/**
 * 노드 스타일 타입 (단순화)
 * 
 * - 평탄한 CSS 객체 구조
 * - className을 추가 속성으로 포함
 * - 카테고리별 중첩 제거
 */
export interface NodeStyle extends CSSProperties {
  className?: string;
}
