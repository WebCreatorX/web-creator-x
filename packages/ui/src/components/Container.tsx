import { ContainerNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function Container({
  node,
  children,
}: NodeComponentProps<ContainerNode>) {
  //스타일 변환
  const nodeStyleObj = processNodeStyles(node.style);

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      style={nodeStyleObj.root}
      className={`${node.style.root?.className} h-full w-full`}
    >
      {/* Container는 자식이 있을 경우 렌더링 */}
      {children}
    </div>
  );
}
