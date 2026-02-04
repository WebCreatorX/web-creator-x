import { NodeComponentProps, StackNode } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function StackComponent({
  node,
  children,
}: NodeComponentProps<StackNode>) {
  const cssProps = processNodeStyles(node.style);

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      style={cssProps}
      className={`${node.style.className || ""} h-full w-full`}
    >
      {children}
    </div>
  );
}
