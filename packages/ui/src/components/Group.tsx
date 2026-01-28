import { GroupNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

// Group.tsx
export default function Group({
  children,
  node,
}: NodeComponentProps<GroupNode>) {
  const cssProps = processNodeStyles(node.style);
  return (
    <div
      data-component-type="Group"
      data-component-id={node.id}
      style={cssProps}
      className={`${node.style.className || ""} h-full w-full`}
    >
      {children}
    </div>
  );
}
