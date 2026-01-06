"use client";

import { useSelectedNode, useEditorActions } from "@/mocks/useEditorStore";
import TextControl from "./nodes/TextControl";
import HeroControl from "./nodes/HeroControl";
import ImageControl from "./nodes/ImageControl";
import ButtonControl from "./nodes/ButtonControl";
import ModalControl from "./nodes/ModalControl";

const CONTROLLERS: Record<string, any> = {
    Text: TextControl,
    Heading: TextControl, 
    Hero: HeroControl,
    Image: ImageControl,  
    Button: ButtonControl,
    Modal: ModalControl,  
    Container: () => <div className="text-gray-400">컨테이너는 직접 수정할 속성이 없습니다.</div>
  };

export default function RightSidebar() {
  const selectedNode = useSelectedNode();
  const { updateNode } = useEditorActions();

  if (!selectedNode) {
    return (
      <div style={{ padding: "20px", color: "#999", textAlign: "center" }}>
        편집할 요소를 선택해주세요.
      </div>
    );
  }

  const SpecificControl = CONTROLLERS[selectedNode.type];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: "10px", backgroundColor: "#007bff", color: "white", padding: "2px 6px", borderRadius: "10px" }}>
          {selectedNode.type}
        </span>
        <span style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}>ID: {selectedNode.id}</span>
      </div>

      {SpecificControl ? (
        <SpecificControl
          node={selectedNode}
          onUpdate={(newProps: any) => updateNode(selectedNode.id, newProps)}
        />
      ) : (
        <div style={{ fontSize: "13px", color: "#666" }}>
          {selectedNode.type} 타입은 아직 편집을 지원하지 않습니다.
        </div>
      )}
    </div>
  );
}