
import { WcxNode } from "@repo/ui/types/nodes";
import { NodeStyle } from "@repo/ui/types/styles";

// ComponentDefault Data Type
// 추천 코드를 반영하여 layout 필드를 분리하고 타입 안정성을 강화했습니다.
export interface ComponentDefaults {
  props: Record<string, unknown>; // 각 노드 타입에 맞는 props (통합 노드 타입에서 추론)
  style: NodeStyle;      // @repo/ui의 규격화된 스타일 구조 (root 등)
  layout: WcxNode['layout']; // x, y, width, height, zIndex
}

export const COMPONENT_DEFAULTS: Record<WcxNode['type'], ComponentDefaults> = {
  Hero: {
    props: {
      heading: "Hero Heading",
      subHeading: "Hero SubHeading",
      image: {
        url: "https://via.placeholder.com/800x400",
      },
      button: {
        text: "Action",
        link: "#",
      },
    },
    style: {
      root: {
        layout: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        background: { backgroundColor: "#f0f0f0" },
      },
    },
    layout: {
      x: 0,
      y: 0,
      width: 1000, // WcxNode layout 타입에 맞춰 숫자로 지정
      height: 400,
      zIndex: 0,
    },
  },
  Image: {
    props: {
      src: "https://via.placeholder.com/400x300",
      alt: "Image",
      caption: "Image Caption",
    },
    style: {
      root: {},
    },
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
      root: {
        typography: {
          color: "#000000",
          fontSize: "24px",
          fontWeight: "bold",
        },
      },
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
      root: {
        typography: {
          color: "#333333",
          fontSize: "16px",
        },
      },
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
      root: {
        background: { backgroundColor: "#007bff" },
        typography: { color: "#ffffff" },
        effects: { borderRadius: "4px" },
      },
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
      root: {
        effects: { border: "1px dashed #ccc" },
      },
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
      root: {
        background: { backgroundColor: "#ffffff" },
        effects: { borderRadius: "8px" },
      },
    },
    layout: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      zIndex: 100,
    },
  },
};
