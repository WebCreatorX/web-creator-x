"use client";

import { TextNode } from "@repo/ui/types/nodes";
import TextInput from "../atoms/TextInput";

interface TextControlProps {
  node: TextNode;
  onUpdate: (newProps: Partial<TextNode["props"]>) => void;
}

export default function TextControl({ node, onUpdate }: TextControlProps) {
  return (
    <div>
      <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>텍스트 설정</h4>
      {/* 텍스트 내용 수정 */}
      <TextInput
        label="내용"
        value={node.props.text}
        onChange={(v) => onUpdate({ text: v })}
      />
      
      {/* 텍스트 레벨 표시 (현재는 단순 표시용) */}
      <div style={{ fontSize: "12px", color: "#999" }}>
        현재 레벨: {node.props.level}
      </div>
    </div>
  );
}