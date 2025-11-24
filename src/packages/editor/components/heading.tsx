import { NodeComponentProps } from "@/packages/editor/types/component";
import { HeadingNode } from "../types/nodes";
import applyStyles from "../nodeRenerder/applyStyles";

export default function HeadingComponent({
  node,
  props,
  style,
  children,
}: NodeComponentProps<HeadingNode>) {
  const { text, level = "h2" } = props;
  const inlineStyle = applyStyles(style);
  const Tag = level;

  return (
    <div data-component-id={node.id} className={style.className}>
      <Tag style={inlineStyle}>{text}</Tag>
      {/* 컨테이너일 경우 이곳에 children이 렌더링 되야 한다. */}
      {children}
    </div>
  );
}
