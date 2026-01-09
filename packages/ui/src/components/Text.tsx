import { NodeComponentProps, TextNode } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function TextComponent({
  node,
  props,
  style,
  children,
}: NodeComponentProps<TextNode>) {
  const { text, level = "h2" } = props;
  const Tag = level;

  const nodeStyleObj = processNodeStyles(style);

  return (
    <section
      data-component-id={node.id}
      className={style.root?.className}
      style={{ ...nodeStyleObj.root, width: "100%", height: "100%" }}
    >
      <Tag style={nodeStyleObj.text}>{text}</Tag>
      {/* TODO-만약 텍스트 컴포넌트가 사진같은 정적 파일도 렌더링 해야한다면? */}
      {children}
    </section>
  );
}
