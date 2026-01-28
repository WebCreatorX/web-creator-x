import { ContainerNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function Container({
  node,
  children,
}: NodeComponentProps<ContainerNode>) {
  const cssProps = processNodeStyles(node.style);

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      style={cssProps}
      className={`${node.style.className || ""} h-full w-full`}
    >
      {/* Container는 자식이 있을 경우 렌더링 */}
      {children}
    </div>
  );
}
