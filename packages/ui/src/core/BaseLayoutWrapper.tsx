import { BaseNode } from "types";

interface Props {
  children: React.ReactNode;
  node: BaseNode;
}

//라이브 모드에서는 항상 사용, 에디터 모드에서는 상황에 따라 선택적으로 사용됩니다.
export default function BaseLayoutNodeWrapper({ children, node }: Props) {
  const { x: top, y: left, width, height, zIndex } = node.layout;
  return (
    <div style={{ position: "absolute", top, left, width, height, zIndex }}>
      {children}
    </div>
  );
}
