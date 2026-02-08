"use client";

import { useCurNodes, useSelectedNodeId } from "@/stores/useEditorStore";
import SettingsTitle from "./SettingsTitle";
import TextPanel from "./panels/TextPanel";
import ButtonPanel from "./panels/ButtonPanel";
import ImagePanel from "./panels/ImagePanel";
import LayoutPanel from "./panels/LayoutPanel";
import { WcxNode } from "@repo/ui/types/nodes";

// 노드 타입별 패널 매핑 객체
const PANEL_COMPONENTS: Record<WcxNode["type"], React.ComponentType<{ node: any }>> = {
  Text: TextPanel,
  Heading: TextPanel,
  Button: ButtonPanel,
  Image: ImagePanel,
  Container: LayoutPanel,
  Stack: LayoutPanel,
  Modal: LayoutPanel,
  Group: LayoutPanel,
};

export default function RightSidebar() {
  const selectedNodeId = useSelectedNodeId();
  const nodes = useCurNodes();

  const selectedNode = nodes?.find((node) => node.id === selectedNodeId);

  // 노드 타입별 패널 렌더링 로직 (객체 매핑 사용)
  const renderPanel = () => {
    if (!selectedNode) return null;

    const Panel = PANEL_COMPONENTS[selectedNode.type] || LayoutPanel;
    return <Panel node={selectedNode} />;
  };

  return (
    <div className="flex h-full w-[300px] flex-col gap-6 border-l border-[#E4E4E7] bg-white px-5 py-6 overflow-y-auto">
      <SettingsTitle type={selectedNode?.type} />

      {selectedNode ? (
        <div className="flex flex-col gap-6">
          {renderPanel()}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-zinc-400 text-sm italic font-inter">
          Select a node to edit its properties
        </div>
      )}
    </div>
  );
}
