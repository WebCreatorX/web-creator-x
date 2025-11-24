"use client";

import React from "react";
import readNodeId from "./util/readNodeId";

/**
 * NODE (id: 1001) 데이터
 */
const node1001_props = {
  heading: "WebCreator-X에 오신 것을 환영합니다",
  subheading: "세상에 하나뿐인 당신의 웹사이트를 만들어보세요.",
  button: { text: "시작하기", link: "/signup" },
  backgroundImage: {
    url: "https://images.example.com/hero-bg.jpg",
    alt: "추상적인 배경 이미지",
  },
};
const node1001_style = {
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  dimensions: { minHeight: "500px", padding: "80px 24px" },
  background: {
    backgroundColor: "#111827",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  typography: { color: "#FFFFFF", textAlign: "center" },
  className: "hero-container-main",
};

/**
 * NODE (id: 1002) 데이터 - 컨테이너 (1003, 1004의 부모)
 */
const node1002_style = {
  layout: { display: "block" },
  dimensions: { padding: "50px 24px", maxWidth: "1200px", margin: "0 auto" },
  background: { backgroundColor: "#FFFFFF" },
  className: "content-section",
};

/**
 * NODE (id: 1003) 데이터 - 1002의 자식
 */
const node1003_props = { text: "주요 기능 소개", level: "h2" };
const node1003_style = {
  typography: { color: "#111827", fontSize: "36px", textAlign: "center" },
  dimensions: { marginBottom: "30px" },
};

/**
 * NODE (id: 1004) 데이터 - 1002의 자식
 */
const node1004_props = {
  text: "직관적인 드래그 앤 드롭 인터페이스로 코딩 없이 웹사이트를 완성하세요. 모든 컴포넌트는 사용자가 원하는 대로 커스터마이징할 수 있습니다.",
};
const node1004_style = {
  typography: {
    color: "#374151",
    fontSize: "18px",
    lineHeight: 1.6,
    textAlign: "center",
  },
  dimensions: { maxWidth: "800px", margin: "0 auto" },
};

/**
 * NODE (id: 1005) 데이터 - 컨테이너 (1006, 1007, 1008, 1009의 부모)
 */
const node1005_style = {
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  dimensions: { padding: "50px 24px", maxWidth: "1200px", margin: "0 auto" },
  background: { backgroundColor: "#F9FAFB" },
  className: "gallery-section",
};

/**
 * NODE (id: 1006) 데이터 - 1005의 자식 (이미지)
 */
const node1006_props = {
  src: "https://images.example.com/gallery-1.jpg",
  alt: "갤러리 이미지 1",
};
const node1006_style = {
  dimensions: { width: "100%", height: "300px", objectFit: "cover" },
  effects: { borderRadius: "8px" },
};

/**
 * NODE (id: 1007) 데이터 - 1005의 자식 (이미지)
 */
const node1007_props = {
  src: "https://images.example.com/gallery-2.jpg",
  alt: "갤러리 이미지 2",
};
const node1007_style = {
  dimensions: { width: "100%", height: "300px", objectFit: "cover" },
  effects: { borderRadius: "8px" },
};

/**
 * NODE (id: 1008) 데이터 - 1005의 자식 (텍스트)
 */
const node1008_props = { text: "이미지 설명 1" };
const node1008_style = {
  typography: { textAlign: "center", fontSize: "14px", color: "#6B7280" },
  dimensions: { marginTop: "10px" },
};

/**
 * NODE (id: 1009) 데이터 - 1005의 자식 (텍스트)
 */
const node1009_props = { text: "이미지 설명 2" };
const node1009_style = {
  typography: { textAlign: "center", fontSize: "14px", color: "#6B7280" },
  dimensions: { marginTop: "10px" },
};

/**
 * NODE (id: 1010) 데이터 (버튼)
 */
const node1010_props = { text: "더 알아보기", link: "/features" };
const node1010_style = {
  layout: { display: "block", margin: "40px auto" },
  dimensions: { padding: "15px 30px", width: "200px" },
  background: { backgroundColor: "#3B82F6" },
  typography: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
  effects: { borderRadius: "5px", cursor: "pointer" },
};

// --- 스타일 헬퍼 ---
// 모든 스타일 하위 객체(layout, dimensions 등)를 병합하여
// React의 inline style prop으로 변환합니다.
function applyStyles(styleData, bgImageUrl = null) {
  const combinedStyles = {};

  // styleData의 모든 키(layout, dimensions, background...)를 순회하며
  // 하위 객체들을 combinedStyles로 병합합니다.
  for (const key in styleData) {
    if (key !== "className" && typeof styleData[key] === "object") {
      Object.assign(combinedStyles, styleData[key]);
    }
  }

  if (bgImageUrl) {
    combinedStyles.backgroundImage = `url(${bgImageUrl})`;
  }

  return combinedStyles;
}

// --- 10개 노드를 렌더링하는 하드코딩된 테스트 캔버스 ---

function HardcodedTestCanvas() {
  // 여기에 EditorCanvas.jsx에 만드셨던
  // handleClick 이벤트 핸들러를 붙여서 테스트하시면 됩니다.

  return (
    <div className="editor-canvas-wrapper" onClick={readNodeId}>
      {/* --- Node 1001 (Hero) --- */}
      <div
        data-component-id="1001"
        className={node1001_style.className}
        style={applyStyles(node1001_style, node1001_props.backgroundImage.url)}
      >
        <h1>{node1001_props.heading}</h1>
        <p>{node1001_props.subheading}</p>
        <a href={node1001_props.button.link} style={{ color: "#FFF" }}>
          {node1001_props.button.text}
        </a>
      </div>

      {/* --- Node 1002 (Container) --- */}
      <div
        data-component-id="1002"
        className={node1002_style.className}
        style={applyStyles(node1002_style)}
      >
        {/* --- Node 1003 (Child of 1002) --- */}
        <div data-component-id="1003" style={applyStyles(node1003_style)}>
          <h2 style={node1003_style.typography}>{node1003_props.text}</h2>
        </div>

        {/* --- Node 1004 (Child of 1002) --- */}
        <div data-component-id="1004" style={applyStyles(node1004_style)}>
          <p style={node1004_style.typography}>{node1004_props.text}</p>
        </div>
      </div>

      {/* --- Node 1005 (Container) --- */}
      <div
        data-component-id="1005"
        className={node1005_style.className}
        style={applyStyles(node1005_style)}
      >
        {/* --- Node 1006 (Child of 1005) --- */}
        <div data-component-id="1006">
          <img
            src={node1006_props.src}
            alt={node1006_props.alt}
            style={applyStyles(node1006_style)}
          />
        </div>

        {/* --- Node 1007 (Child of 1005) --- */}
        <div data-component-id="1007">
          <img
            src={node1007_props.src}
            alt={node1007_props.alt}
            style={applyStyles(node1007_style)}
          />
        </div>

        {/* --- Node 1008 (Child of 1005) --- */}
        <div data-component-id="1008" style={applyStyles(node1008_style)}>
          <p style={node1008_style.typography}>{node1008_props.text}</p>
        </div>

        {/* --- Node 1009 (Child of 1005) --- */}
        <div data-component-id="1009" style={applyStyles(node1009_style)}>
          <p style={node1009_style.typography}>{node1009_props.text}</p>
        </div>
      </div>

      {/* --- Node 1010 (Button) --- */}
      <div data-component-id="1010">
        <a href={node1010_props.link} style={applyStyles(node1010_style)}>
          {node1010_props.text}
        </a>
      </div>
    </div>
  );
}

export default HardcodedTestCanvas;
