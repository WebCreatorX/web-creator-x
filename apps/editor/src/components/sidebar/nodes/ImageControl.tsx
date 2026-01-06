"use client";
import { ImageNode } from "@repo/ui/types/nodes";
import TextInput from "../atoms/TextInput";

export default function ImageControl({ node, onUpdate }: { node: ImageNode, onUpdate: (p: any) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold border-b pb-2">이미지 설정</h4>
      <TextInput label="이미지 주소(src)" value={node.props.src} onChange={(v) => onUpdate({ src: v })} />
      <TextInput label="대체 텍스트(alt)" value={node.props.alt || ""} onChange={(v) => onUpdate({ alt: v })} />
      <TextInput label="캡션" value={node.props.caption || ""} onChange={(v) => onUpdate({ caption: v })} />
    </div>
  );
}