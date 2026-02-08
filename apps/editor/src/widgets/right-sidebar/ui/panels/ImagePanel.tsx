"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import SidebarItem from "../atoms/SidebarItem";
import TextInput from "../atoms/TextInput";
import LayoutPanel from "./LayoutPanel";

interface ImagePanelProps {
  node: WcxNode;
}

export default function ImagePanel({ node }: ImagePanelProps) {
  const updateNode = useUpdateNode();

  return (
    <div className="flex flex-col gap-5">
      <SidebarItem label="Alt Text">
        <TextInput
          value={(node.props as any).alt || ""}
          onChange={(val) =>
            updateNode(node.id, { props: { ...node.props, alt: val } })
          }
          placeholder="Image description..."
        />
      </SidebarItem>
      <LayoutPanel node={node} />
    </div>
  );
}
