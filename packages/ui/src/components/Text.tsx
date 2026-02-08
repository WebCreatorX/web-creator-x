import { NodeComponentProps, TextNode } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function TextComponent({
  node,
  children,
}: NodeComponentProps<TextNode>) {
  const { text, level = "h2" } = node.props;
  const Tag = level;

  const cssProps = processNodeStyles(node.style);

  return (
    <Tag
      data-component-type={node.type}
      data-component-id={node.id}
      className={node.style.className || ""}
      style={{ ...cssProps, width: "100%", height: "100%" }}
    >
      {text}
      {children}
    </Tag>
  );
}
