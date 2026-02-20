"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import SidebarItem from "../atoms/SidebarItem";
import TextInput from "../atoms/TextInput";
import LayoutSection from "../sections/LayoutSection";

interface ImagePanelProps {
  node: WcxNode;
}

export default function ImagePanel({ node }: ImagePanelProps) {
  const updateNode = useUpdateNode();

  return (
    <div className="flex flex-col gap-5">
      <SidebarItem label="Alt Text">
        <TextInput
          value={(node.props as { alt?: string }).alt || ""}
          onChange={(val) =>
            updateNode(node.id, { props: { ...node.props, alt: val } })
          }
          placeholder="Image description..."
        />
      </SidebarItem>
      <LayoutSection node={node} />
    </div >
  );
}
