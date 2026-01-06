"use client";
import { ButtonNode } from "@repo/ui/types/nodes";
import TextInput from "../atoms/TextInput";

export default function ButtonControl({ node, onUpdate }: { node: ButtonNode, onUpdate: (p: any) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold border-b pb-2">버튼 설정</h4>
      <TextInput label="버튼 문구" value={node.props.text} onChange={(v) => onUpdate({ text: v })} />
      {/* ActionPicker는 추후 고도화 단계에서 구현 가능 */}
      <p className="text-xs text-gray-400">액션 설정: {JSON.stringify(node.props.action || "없음")}</p>
    </div>
  );
}