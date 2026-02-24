//노드의 타입별로 달라지는 props의 타입을 정의.

import { NodeAction } from "./nodeAction";
import { WcxNode } from "./nodes";

// HeroProps 제거됨 - 레거시
// 2. Image 컴포넌트 Props
export interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

// 3. Heading 컴포넌트 Props
export interface HeadingProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// 4. Button 컴포넌트 Props
// 클릭 이벤트도 들어가야 하는거 아닌가?
export interface ButtonProps {
  text: string;
  action?: NodeAction;
}

export interface TextProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// 5. Container 컴포넌트 Props (보통 비어있거나 ID 정도만 가짐)
export interface ContainerProps {
  id?: string;
  tagName?: "div" | "section" | "article";
}

export interface ModalProps {
  // 위치 프리셋 (핵심)
  alignment: "center" | "top" | "bottom" | "left" | "right";
  // 오버레이 설정
  overlayColor?: string; // "bg-black/50"
  closeOnOverlayClick?: boolean;
  // 애니메이션 프리셋
  animation?: "fade" | "slide-up" | "slide-left";
}

export interface StackProps {
  direction?: "row" | "column";
}
