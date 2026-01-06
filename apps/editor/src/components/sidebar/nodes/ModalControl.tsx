"use client";
import { ModalNode } from "@repo/ui/types/nodes";
import Select from "../atoms/Select";

export default function ModalControl({ node, onUpdate }: { node: ModalNode, onUpdate: (p: any) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold border-b pb-2">모달 설정</h4>
      <Select 
        label="정렬 위치" 
        value={node.props.alignment} 
        options={[
          { label: "중앙", value: "center" },
          { label: "상단", value: "top" },
          { label: "하단", value: "bottom" }
        ]} 
        onChange={(v) => onUpdate({ alignment: v })} 
      />
      <Select 
        label="애니메이션" 
        value={node.props.animation || "fade"} 
        options={[
          { label: "페이드", value: "fade" },
          { label: "슬라이드 업", value: "slide-up" }
        ]} 
        onChange={(v) => onUpdate({ animation: v })} 
      />
    </div>
  );
}