"use client";

import { useCurNodes, useSelectedNodeId } from "@/stores/useEditorStore";
import SettingsTitle from "./SettingsTitle";
import TextPanel from "./panels/TextPanel";
import ButtonPanel from "./panels/ButtonPanel";
import ImagePanel from "./panels/ImagePanel";
import PositionSection from "./sections/PositionSection";
import SizeSection from "./sections/SizeSection";
import LayoutSection from "./sections/LayoutSection";
import PropertySection from "./sections/PropertySection";
import { WcxNode } from "@repo/ui/types/nodes";

// 노드 타입별 Content 패널 매핑
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONTENT_PANEL: Partial<Record<WcxNode["type"], React.ComponentType<{ node: any }>>> = {
  Text: TextPanel,
  Heading: TextPanel,
  Button: ButtonPanel,
  Image: ImagePanel,
};

// Layout 패널을 표시할 노드 타입
const LAYOUT_TYPES: WcxNode["type"][] = ["Container", "Stack", "Modal", "Group"];

export default function RightSidebar() {
  const selectedNodeId = useSelectedNodeId();
  const nodes = useCurNodes();

  const selectedNode = nodes?.find((n) => n.id === selectedNodeId);
  const ContentPanel = selectedNode ? CONTENT_PANEL[selectedNode.type] : undefined;

  return (
    <div className="flex h-full w-[300px] flex-col border-l border-[#E4E4E7] bg-white px-5 py-5 overflow-y-auto">
      <SettingsTitle type={selectedNode?.type} />

      {selectedNode ? (
        <div className="flex flex-col mt-3 gap-2">
          <PropertySection title="Position">
            <PositionSection node={selectedNode} />
          </PropertySection>

          {/* ─── Size ─── */}
          <PropertySection title="Size">
            <SizeSection node={selectedNode} />
          </PropertySection>

          {/* ─── Layout (컨테이너 계열만) ─── */}
          {LAYOUT_TYPES.includes(selectedNode.type) && (
            <PropertySection title="Layout">
              <LayoutSection node={selectedNode} />
            </PropertySection>
          )}

          {/* ─── Content (노드 타입 고유 속성) ─── */}
          {ContentPanel && (
            <PropertySection title="Content">
              <ContentPanel node={selectedNode} />
            </PropertySection>
          )}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-zinc-400 text-sm italic font-inter">
          Select a node to edit its properties
        </div>
      )}
    </div>
  );
}
