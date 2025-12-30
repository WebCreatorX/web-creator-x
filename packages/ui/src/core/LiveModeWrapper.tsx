import { BaseNode } from "types";

//라이브 모드에서 사용되는 노드 렌더러 래퍼 컴포넌트입니다.
interface props {
  children: React.ReactNode;
  node: BaseNode;
}

export default function LiveModeWrapper({ children, node }: props) {
  const { x, y, width, height, zIndex } = node.layout;

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width,
    height,
    zIndex,
  };
  return <div style={wrapperStyle}>{children}</div>;
}
