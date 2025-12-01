import { CSSProperties } from "react";

//노드의 스타일 타입은 반드시 카테고리 별로 구분되어 저장되야 한다.
//최소 단위. 하나의 요소에 적용될 스타일 그룹

type ElementStyleKey =
  | `layout` //전체적인 레이아웃
  | "dimensions" //노드의 크기
  | "typography" //폰트 관련 CSS
  | "background" //배경
  | "effects"; // boxShadow, opacity, borderRadius 등
export interface ElementStyle
  //FIXME - root 스타일은 크기(dimensions),레이아웃(layout)을 제외한 나머지(배경, 테두리, 패딩)만 담당하도록 수정해야한다.
  extends Partial<Record<ElementStyleKey, CSSProperties>> {
  // 2. HTML 클래스 (Tailwind 유틸리티 등) -> 추후 바이브 코딩의 결과물을 받았을때 사용될 속성입니다.
  className?: string;

  // 3. 확장성을 위한 인덱스 시그니처
  // 나중에 'animation'이나 'hover' 같은 그룹이 추가 예정
  [key: string]: CSSProperties | string | undefined;
}

export type NodeStyleKey =
  | "root" //필수: 최상위 컨테이너 -> 항상 최상위 컨테이너 스타일은 root로 지정
  | "button" // 옵션: 제목
  | "heading" // 옵션: 부제목
  | "subHeading" // 옵션: 버튼
  | "image" // 옵션: 이미지
  | "text"; // 옵션: 텍스트

// 2. 컴포넌트 전체 스타일: 부위별(Key)로 ElementStyle을 가짐

export interface NodeStyle extends Partial<Record<NodeStyleKey, ElementStyle>> {
  [key: string]: ElementStyle | undefined;
}
