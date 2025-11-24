import { CSSProperties } from "react";

//노드의 스타일 타입은 반드시 카테고리 별로 구분되어 저장되야 한다.
export interface NodeStyle {
  layout?: CSSProperties; //전체적인 레이아웃
  dimensions?: CSSProperties; //노드의 크기
  typography?: CSSProperties; //폰트 관련 CSS
  background?: CSSProperties; //배경
  effects?: CSSProperties; // boxShadow, opacity, borderRadius 등

  // 2. HTML 클래스 (Tailwind 유틸리티 등) -> 추후 바이브 코딩의 결과물을 받았을때 사용될 속성입니다.
  className?: string;

  // 3. 확장성을 위한 인덱스 시그니처
  // 나중에 'animation'이나 'hover' 같은 그룹이 추가 예정
  [key: string]: CSSProperties | string | undefined;
}
