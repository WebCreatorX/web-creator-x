import { WcxNode } from "@repo/ui/types/nodes";
import { NodeStyle } from "@repo/ui/types/styles";

// ComponentDefault Data Type
// 추천 코드를 반영하여 layout 필드를 분리하고 타입 안정성을 강화했습니다.
export interface ComponentDefaults {
  props: Record<string, unknown>; // 각 노드 타입에 맞는 props (통합 노드 타입에서 추론)
  style: NodeStyle;      // @repo/ui의 규격화된 스타일 구조 (평탄화된 구조)
  layout: WcxNode['layout']; // x, y, width, height, zIndex
}

// 모든 컴포넌트의 기본 레이아웃 스타일 (Flex Row 중앙 정렬)
const DEFAULT_FLEX_STYLE: NodeStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const DEFAULT_LAYOUT_MODE = {
  widthMode: 'fixed' as const,
  heightMode: 'fixed' as const,
  widthUnit: 'px' as const,
  heightUnit: 'px' as const,
};

export const COMPONENT_DEFAULTS: Record<WcxNode['type'], ComponentDefaults> = {
  Image: {
    props: {
      src: "https://via.placeholder.com/400x300",
      alt: "Image",
      caption: "Image Caption",
    },
    style: {
      ...DEFAULT_FLEX_STYLE,
    },
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      zIndex: 0,
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Heading: {
    props: {
      text: "Heading",
      level: "h2",
    },
    style: {
      ...DEFAULT_FLEX_STYLE,
      color: "#000000",
      fontSize: "24px",
      fontWeight: "700",
    },
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 50,
      zIndex: 1,
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Text: {
    props: {
      text: "This is a text block.",
      level: "h5",
    },
    style: {
      ...DEFAULT_FLEX_STYLE,
      color: "#333333",
      fontSize: "16px",
      background: 'white',
      border: '1px solid #ccc',
    },
    layout: {
      x: 0,
      y: 0,
      width: 300,
      height: 100,
      zIndex: 1,
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Button: {
    props: {
      text: "Button",
    },
    style: {
      ...DEFAULT_FLEX_STYLE,
      backgroundColor: "#007bff",
      color: "#ffffff",
      borderRadius: "4px",
    },
    layout: {
      x: 0,
      y: 0,
      width: 120,
      height: 40,
      zIndex: 2,
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Container: {
    props: {
      tagName: "div",
    },
    style: {
      ...DEFAULT_FLEX_STYLE,
      border: "1px dashed #ccc",
      backgroundColor: "#ffffff",
    },
    layout: {
      x: 0,
      y: 0,
      width: 500,
      height: 200,
      zIndex: 0,
      ...DEFAULT_LAYOUT_MODE,
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
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Stack: {
    props: {},
    style: {
      ...DEFAULT_FLEX_STYLE,
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
      ...DEFAULT_LAYOUT_MODE,
    },
  },
  Group: {
    props: {},
    style: {
      ...DEFAULT_FLEX_STYLE,
    },
    layout: {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      zIndex: 0,
      ...DEFAULT_LAYOUT_MODE,
    },
  },
};

