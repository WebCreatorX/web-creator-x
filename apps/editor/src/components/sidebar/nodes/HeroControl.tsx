"use client";

import { HeroNode } from "@repo/ui/types/nodes";
import TextInput from "../atoms/TextInput";

interface HeroControlProps {
  node: HeroNode;
  onUpdate: (newProps: Partial<HeroNode["props"]>) => void;
}

export default function HeroControl({ node, onUpdate }: HeroControlProps) {
  const { props } = node;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h4 style={{ fontWeight: "bold", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>히어로 섹션 편집</h4>
      
      {/* 1. 기본 텍스트 영역 */}
      <TextInput label="메인 헤딩" value={props.heading} onChange={(v) => onUpdate({ heading: v })} />
      <TextInput label="서브 헤딩" value={props.subHeading || ""} onChange={(v) => onUpdate({ subHeading: v })} />

      {/* 2. 버튼 영역 (객체 구조) */}
      <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
        <p style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>버튼 설정</p>
        <TextInput 
          label="버튼 텍스트" 
          value={props.button?.text || ""} 
          onChange={(v) => onUpdate({ 
            button: { ...props.button, text: v, link: props.button?.link || "" } 
          })} 
        />
        <TextInput 
          label="버튼 링크" 
          value={props.button?.link || ""} 
          onChange={(v) => onUpdate({ 
            button: { ...props.button, link: v, text: props.button?.text || "" } 
          })} 
        />
      </div>

      {/* 3. 이미지 영역 */}
      <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
        <p style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>배경 이미지</p>
        <TextInput 
          label="이미지 URL" 
          value={props.image?.url || ""} 
          onChange={(v) => onUpdate({ 
            image: { ...props.image, url: v } 
          })} 
        />
      </div>
    </div>
  );
}