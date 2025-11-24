import * as componentProps from "@/packages/editor/types/componentProps";
import { NodeStyle } from "./styles";

//노드의 타입별로 Props의 Json구조가 달라진다. 이를 추론하기 위해 기본 노드 타입인 BaseNode를 상속받아
//노드의 타입 별로 달라지는 node타입을 선언

// 1. 공통 필드 (모든 노드가 무조건 가지는 것)
interface BaseNode {
  id: string; //UUID
  page_id: string | number; // 소속 페이지
  parent_id: string | null; // 부모 노드
  position: number; // 정렬 순서
  style: NodeStyle; // 스타일 (공통)
  created_at?: string;
}

//type에 따라 props가 동적으로 정해져서 모두 다르게 타입 선언 해야함.
// 2. 각 노드별 구체적 정의 (type과 props를 묶음)
export interface HeroNode extends BaseNode {
  type: "Hero";
  props: componentProps.HeroProps;
}

export interface ImageNode extends BaseNode {
  type: "Image";
  props: componentProps.ImageProps;
}

export interface HeadingNode extends BaseNode {
  type: "Heading";
  props: componentProps.HeadingProps;
}

export interface ButtonNode extends BaseNode {
  type: "Button";
  props: componentProps.ButtonProps;
}

export interface ContainerNode extends BaseNode {
  type: "Container";
  props: componentProps.ContainerProps;
}

// 3. 통합 노드 타입
// 이제 WcxNode 타입을 쓰면 type 체크 시 props가 자동 추론.
export type WcxNode =
  | HeroNode
  | ImageNode
  | HeadingNode
  | ButtonNode
  | ContainerNode;
