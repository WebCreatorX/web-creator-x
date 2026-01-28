import { GroupNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

// Group.tsx
export default function Group({
  children,
  node,
}: NodeComponentProps<GroupNode>) {
  // Group은 스타일이 거의 없음 (투명 컨테이너)
  const nodeStyleObj = processNodeStyles(node.style);
  return (
    <div
      data-component-type="Group"
      data-component-id={node.id}
      style={nodeStyleObj.root}
      className={`${node.style.root?.className} h-full w-full`}
    >
      {children}
    </div>
  );
}
