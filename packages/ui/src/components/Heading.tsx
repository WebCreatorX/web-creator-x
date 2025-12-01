import processNodeStyles from "utils/processNodeStyles";
import { NodeComponentProps } from "../types";
import { HeadingNode } from "../types/nodes";

export default function HeadingComponent({
  node,
  props,
  style,
  children,
}: NodeComponentProps<HeadingNode>) {
  const { text, level = "h2" } = props;
  const nodeStyleObj = processNodeStyles(style);

  const Tag = level;

  return (
    <div
      data-component-id={node.id}
      className={`${style.root?.className} flex h-full w-full items-center justify-center`}
      style={{ ...nodeStyleObj.root, width: "100%", height: "100%" }}
    >
      <Tag style={nodeStyleObj.heading}>{text}</Tag>
      {/* 컨테이너일 경우 이곳에 children이 렌더링 되야 한다. */}
      {children}
    </div>
  );
}
