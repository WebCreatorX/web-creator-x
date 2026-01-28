import Image from "next/image";
import { NodeComponentProps } from "../types/component";
import { ImageNode } from "../types/nodes";
import processNodeStyles from "utils/processNodeStyles";

export default function ImageComponent({
  node,
  children,
}: NodeComponentProps<ImageNode>) {
  const { src, alt = "사용자의 이미지", caption } = node.props;
  const { style } = node;
  const nodeStyleObj = processNodeStyles(style);

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      className={`${style.root?.className} flex flex-col gap-1`}
      style={{
        ...nodeStyleObj.root,
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={nodeStyleObj.image}
        draggable={false}
      />
      {caption && <div>{caption}</div>}
      {children}
    </div>
  );
}
