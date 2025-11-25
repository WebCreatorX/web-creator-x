import Image from "next/image";
import applyStyles from "../utils/applyStyles";
import { NodeComponentProps } from "../types/component";
import { ImageNode } from "../types/nodes";

export default function ImageComponent({
  node,
  props,
  style,
}: NodeComponentProps<ImageNode>) {
  const { src, alt = "사용자의 이미지", caption } = props;
  const inlineStyles = applyStyles(style);

  return (
    <div
      data-component-id={node.id}
      className={`${style.className} flex flex-col gap-1`}
    >
      <Image src={src} alt={alt} style={inlineStyles} />
      {caption && <div>{caption}</div>}
    </div>
  );
}
