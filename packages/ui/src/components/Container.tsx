import { ContainerNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function Container({
  node,
  style,
  children,
}: NodeComponentProps<ContainerNode>) {
  //스타일 변환
  const nodeStyleObj = processNodeStyles(style);

  return (
    <div
      data-component-id={node.id}
      style={nodeStyleObj.root}
      className={style.root?.className}
    >
      {/* Container는 자식이 있을 경우 렌더링 */}
      {children}
    </div>
  );
}
