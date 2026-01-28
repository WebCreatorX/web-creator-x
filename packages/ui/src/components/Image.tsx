import Image from "next/image";
import { NodeComponentProps } from "../types/component";
import { ImageNode } from "../types/nodes";
import processNodeStyles from "utils/processNodeStyles";

export default function ImageComponent({
  node,
  children,
}: NodeComponentProps<ImageNode>) {
  const { src, alt = "사용자의 이미지", caption } = node.props;
  const cssProps = processNodeStyles(node.style);

  return (
    <div
      data-component-type={node.type}
      data-component-id={node.id}
      className={`${node.style.className || ""} flex flex-col gap-1`}
      style={{
        ...cssProps,
        width: "100%",
        height: "100%",
      }}
    >
      <Image src={src} alt={alt} fill draggable={false} />
      {caption && <div>{caption}</div>}
      {children}
    </div>
  );
}
