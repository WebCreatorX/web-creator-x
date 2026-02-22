import { cn } from "@repo/utils";
import { useDragStore } from "context/dragContext";
import { NodeComponentProps, StackNode } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function StackComponent({
  node,
  children,
}: NodeComponentProps<StackNode>) {
  const hoveredStackId = useDragStore((s) => s.hoveredStackId);

  const cssProps = processNodeStyles(node.style);
  const direction = node.props.direction ?? "column";

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      data-stack-direction={direction}
      style={{
        ...cssProps,
        flexDirection: direction,
      }}
      className={cn("h-full w-full", {
        "node.style.className": node.style.className,
        "ring-semantic-info ring-2": hoveredStackId === node.id,
      })}
    >
      {children}
    </div>
  );
}

