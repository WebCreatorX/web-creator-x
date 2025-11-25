import { WcxNode } from "./nodes";

//입력 받는 Node의 타입에 따라 달라진다.
export interface NodeComponentProps<T extends WcxNode> {
  node: T;
  props: T["props"];
  style: T["style"];
  children?: React.ReactNode;
}
