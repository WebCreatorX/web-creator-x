import getNodesFromDB from "@/actions/editor/getNodesFromDB";
import Canvas from "@/components/editor/Canvas";
import EditorStoreInitializer from "@/components/editor/EditorStoreInitializer";
import { LeftSidebar } from "@/widgets/left-sidebar";
import { RightSidebar } from "@/widgets/right-sidebar";
import { RuntimeProvider } from "@repo/ui/context/runtimeContext";

export default async function EditorPage() {
  const pageId = 201; //목데이터입니다.
  // 중첩 구조 실험을 위한 테스트 데이터
  // 레이어 기능을 테스트하기 위한 복잡한 중첩 구조 데이터
  const nodes: any[] = [
    {
      id: "root-container",
      type: "Stack",
      page_id: pageId,
      parent_id: null,
      position: 1,
      style: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: "0px",
        gap: "0px",
        borderRadius: "0px",
        position: "absolute",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
      layout: {
        x: 50, y: 50, width: 800, height: 600, zIndex: 1,
        widthMode: "fixed", heightMode: "fixed",
        widthUnit: "px", heightUnit: "px"
      }
    },
    // --- Navigation Bar ---
    {
      id: "navbar",
      type: "Stack",
      page_id: pageId,
      parent_id: "root-container",
      position: 1,
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
      },
      layout: {
        x: 0, y: 0, width: "100%", height: 64, zIndex: 1,
        widthMode: "fill", heightMode: "fixed",
        widthUnit: "%", heightUnit: "px"
      }
    },
    {
      id: "logo",
      type: "Text",
      page_id: pageId,
      parent_id: "navbar",
      position: 1,
      props: { text: "WCX Editor", level: "h4" },
      style: { fontWeight: "900", color: "#111827", fontSize: "18px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "nav-links",
      type: "Stack",
      page_id: pageId,
      parent_id: "navbar",
      position: 2,
      style: { display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "link-home",
      type: "Text",
      page_id: pageId,
      parent_id: "nav-links",
      position: 1,
      props: { text: "Home", level: "h6" },
      style: { color: "#4b5563", fontSize: "14px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "link-about",
      type: "Text",
      page_id: pageId,
      parent_id: "nav-links",
      position: 2,
      props: { text: "About", level: "h6" },
      style: { color: "#4b5563", fontSize: "14px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    // --- Hero Section ---
    {
      id: "hero-section",
      type: "Stack",
      page_id: pageId,
      parent_id: "root-container",
      position: 2,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: "60px 20px",
        backgroundColor: "#f9fafb",
        textAlign: "center"
      },
      layout: {
        x: 0, y: 0, width: "100%", height: "auto", zIndex: 1,
        widthMode: "fill", heightMode: "fill",
        widthUnit: "%", heightUnit: "px"
      }
    },
    {
      id: "hero-title",
      type: "Heading",
      page_id: pageId,
      parent_id: "hero-section",
      position: 1,
      props: { text: "Build Your Web App Faster", level: "h1" },
      style: { color: "#111827", fontWeight: "800", marginBottom: "16px", fontSize: "36px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "hero-desc",
      type: "Text",
      page_id: pageId,
      parent_id: "hero-section",
      position: 2,
      props: { text: "The most powerful no-code editor for modern web developers.", level: "h5" },
      style: { color: "#6b7280", maxWidth: "500px", marginBottom: "32px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "hero-cta-container",
      type: "Stack",
      page_id: pageId,
      parent_id: "hero-section",
      position: 3,
      style: { display: "flex", flexDirection: "row", gap: "12px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "btn-primary",
      type: "Button",
      page_id: pageId,
      parent_id: "hero-cta-container",
      position: 1,
      props: { text: "Get Started" },
      style: { backgroundColor: "#000000", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontWeight: "600" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    {
      id: "btn-secondary",
      type: "Button",
      page_id: pageId,
      parent_id: "hero-cta-container",
      position: 2,
      props: { text: "View Demo" },
      style: { backgroundColor: "#ffffff", color: "#000000", padding: "12px 24px", borderRadius: "8px", border: "1px solid #e5e7eb", fontWeight: "600" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    },
    // --- Footer ---
    {
      id: "footer",
      type: "Stack",
      page_id: pageId,
      parent_id: "root-container",
      position: 3,
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #f3f4f6"
      },
      layout: {
        x: 0, y: 0, width: "100%", height: 60, zIndex: 1,
        widthMode: "fill", heightMode: "fixed",
        widthUnit: "%", heightUnit: "px"
      }
    },
    {
      id: "footer-text",
      type: "Text",
      page_id: pageId,
      parent_id: "footer",
      position: 1,
      props: { text: "© 2024 WebCreatorX. All rights reserved.", level: "h6" },
      style: { color: "#9ca3af", fontSize: "12px" },
      layout: { x: 0, y: 0, width: "auto", height: "auto", zIndex: 1, widthMode: "fit", heightMode: "fit", widthUnit: "px", heightUnit: "px" }
    }
  ];

  return (
    <div className="flex h-screen w-screen flex-col">
      <EditorStoreInitializer initialNodes={nodes}>
        <RuntimeProvider>
          <div className="flex h-full w-full border-2 overflow-hidden">
            <LeftSidebar />
            <Canvas />
            <RightSidebar />
          </div>
        </RuntimeProvider>
      </EditorStoreInitializer>
    </div>
  );
}
