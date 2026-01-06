"use client"

import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { useNodes, useEditorActions, useSelectedNodeId } from "@/mocks/useEditorStore";

export default function Home() {
  const nodes = useNodes();
  const selectedId = useSelectedNodeId();
  const { selectNode } = useEditorActions();

  return (
    /* 전체 화면을 flex로 설정하여 가로로 배치합니다 */
    <div style={{ 
      display: "flex", 
      width: "100%", // 100vw 대신 100% 권장
      height: "100vh", 
      overflow: "hidden",
      boxSizing: "border-box" // 패딩 계산 오류 방지
    }}>      
      {/* 1. 좌측 사이드바 (Nago님 영역: 노드 생성 버튼들) */}
      <aside style={{ 
        width: "260px", 
        minWidth: "260px", // flex 축소 방지
        borderRight: "1px solid #e5e7eb", 
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column"
      }}>
        <LeftSidebar />
      </aside>

      {/* 2. 중앙 메인 영역 (Milo님 영역: 캔버스) */}
      <main style={{ 
        flex: 1, 
        padding: "20px", 
        background: "#f5f5f5",
        overflowY: "auto", // 내용이 많으면 내부에서만 스크롤 되도록
        boxSizing: "border-box" // padding이 너비에 포함되도록 설정
      }}>
        <p>노드를 클릭하면 우측 사이드바에서 편집할 수 있습니다.</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          {Object.values(nodes).map((node) => (
            <button
              key={node.id}
              onClick={() => selectNode(node.id)}
              style={{
                padding: "15px",
                textAlign: "left",
                backgroundColor: selectedId === node.id ? "#e0f2fe" : "white",
                border: `2px solid ${selectedId === node.id ? "#3b82f6" : "#ddd"}`,
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <strong>[{node.type}]</strong> ID: {node.id} <br />
              <small style={{ color: "#666" }}>
                {/* 각 타입별 핵심 미리보기 */}
                {node.type === "Text" || node.type === "Heading" ? node.props.text : ""}
                {node.type === "Hero" ? node.props.heading : ""}
              </small>
            </button>
          ))}
        </div>
      </main>

      {/* 3. 우측 사이드바 (Nago님 영역: 속성 편집창) */}
      <aside style={{ 
        width: "300px", 
        minWidth: "300px", // flex 축소 방지
        borderLeft: "1px solid #e5e7eb", 
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column"
      }}>
        <RightSidebar />
      </aside>
      
    </div>
  );
}