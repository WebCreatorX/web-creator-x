import processNodeStyles from "utils/processNodeStyles";
import { NodeComponentProps } from "../types";
import { HeadingNode } from "../types/nodes";

export default function HeadingComponent({
  node,
  children,
}: NodeComponentProps<HeadingNode>) {
  const { text, level = "h2" } = node.props;
  const cssProps = processNodeStyles(node.style);

  const Tag = level;

  return (
    <Tag
      data-component-type={node.type}
      data-component-id={node.id}
      className={`${node.style.className || ""} flex h-full w-full items-center justify-center`}
      style={{ ...cssProps, width: "100%", height: "100%" }}
    >
      {text}
      {children}
    </Tag>
  );
}
