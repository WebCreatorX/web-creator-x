import { BaseNode } from "types";

interface Props {
  children: React.ReactNode;
  node: BaseNode;
}

export default function BaseLayoutNodeWrapper({ children, node }: Props) {
  const { x: top, y: left, width, height, zIndex } = node.layout;
  return (
    <div style={{ position: "absolute", top, left, width, height, zIndex }}>
      {children}
    </div>
  );
}
