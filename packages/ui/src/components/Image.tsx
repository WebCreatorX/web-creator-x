import Image from "next/image";
import { NodeComponentProps } from "../types/component";
import { ImageNode } from "../types/nodes";
import processNodeStyles from "utils/processNodeStyles";

export default function ImageComponent({
  node,
  props,
  style,
}: NodeComponentProps<ImageNode>) {
  const { src, alt = "사용자의 이미지", caption } = props;
  const nodeStyleObj = processNodeStyles(style);

  return (
    <div
      data-component-id={node.id}
      className={`${style.root?.className} flex flex-col gap-1`}
      style={{ ...nodeStyleObj.root, width: "100%", height: "100%" }}
    >
      <Image src={src} alt={alt} style={nodeStyleObj.image} />
      {caption && <div>{caption}</div>}
    </div>
  );
}
