import { WcxNode } from "@repo/ui/types/nodes";

export const mockNodes: Record<string | number, WcxNode> = {
  "1001": { id: 1001, type: "Hero", props: { heading: "히어로 테스트", button: { text: "클릭", link: "/" } }, /* ...기타필드 */ } as any,
  "1003": { id: 1003, type: "Heading", props: { text: "제목 테스트", level: "h2" }, /* ... */ } as any,
  "1004": { id: 1004, type: "Text", props: { text: "본문 테스트", level: "h4" }, /* ... */ } as any,
  "1006": { id: 1006, type: "Image", props: { src: "https://placehold.co/600x400", alt: "샘플" }, /* ... */ } as any,
  "1010": { id: 1010, type: "Button", props: { text: "더 알아보기" }, /* ... */ } as any,
  "9999": { id: 9999, type: "Modal", props: { alignment: "center", animation: "fade" }, /* ... */ } as any,
};