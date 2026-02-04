import { WcxNode } from "@repo/ui/types/nodes";
import { NodeStyle } from "@repo/ui/types/styles";

// ComponentDefault Data Type
// 추천 코드를 반영하여 layout 필드를 분리하고 타입 안정성을 강화했습니다.
export interface ComponentDefaults {
  props: Record<string, unknown>; // 각 노드 타입에 맞는 props (통합 노드 타입에서 추론)
  style: NodeStyle;      // @repo/ui의 규격화된 스타일 구조 (평탄화된 구조)
  layout: WcxNode['layout']; // x, y, width, height, zIndex
}

export const COMPONENT_DEFAULTS: Record<WcxNode['type'], ComponentDefaults> = {
  Image: {
    props: {
      src: "https://via.placeholder.com/400x300",
      alt: "Image",
      caption: "Image Caption",
    },
    style: {},
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      zIndex: 0,
    },
  },
  Heading: {
    props: {
      text: "Heading",
      level: "h2",
    },
    style: {
      color: "#000000",
      fontSize: "24px",
      fontWeight: "bold",
    },
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 50,
      zIndex: 1,
    },
  },
  Text: {
    props: {
      text: "This is a text block.",
      level: "h5",
    },
    style: {
      color: "#333333",
      fontSize: "16px",
    },
    layout: {
      x: 0,
      y: 0,
      width: 300,
      height: 100,
      zIndex: 1,
    },
  },
  Button: {
    props: {
      text: "Button",
    },
    style: {
      backgroundColor: "#007bff",
      color: "#ffffff",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    layout: {
      x: 0,
      y: 0,
      width: 120,
      height: 40,
      zIndex: 2,
    },
  },
  Container: {
    props: {
      tagName: "div",
    },
    style: {
      border: "1px dashed #ccc",
      backgroundColor: "#ffffff",
    },
    layout: {
      x: 0,
      y: 0,
      width: 500,
      height: 200,
      zIndex: 0,
    },
  },
  Modal: {
    props: {
      alignment: "center",
      overlayColor: "bg-black/50",
      animation: "fade",
      closeOnOverlayClick: true,
    },
    style: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      zIndex: 100,
    },
  },
  // Stack 추가
  Stack: {
    props: {},
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
    },
    layout: {
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      zIndex: 0,
    },
  },
  // Group 추가
  Group: {
    props: {},
    style: {},
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      zIndex: 0,
    },
  },
};

