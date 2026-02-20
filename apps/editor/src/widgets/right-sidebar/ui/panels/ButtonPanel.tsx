"use client";

import { ButtonNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import SidebarItem from "../atoms/SidebarItem";
import TextInput from "../atoms/TextInput";
import LayoutSection from "../sections/LayoutSection";

interface ButtonPanelProps {
  node: ButtonNode;
}

export default function ButtonPanel({ node }: ButtonPanelProps) {
  const updateNode = useUpdateNode();

  const handlePropChange = (key: string, value: string | number | boolean | object) => {
    updateNode(node.id, { props: { ...node.props, [key]: value } });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Label Section */}
      <SidebarItem label="Label">
        <TextInput
          value={node.props.text}
          onChange={(val) => handlePropChange("text", val)}
          placeholder="Enter button text..."
        />
      </SidebarItem>

      {/* Common Layout Section */}
      <LayoutSection node={node} />

      {/* Button Specific Sections (State, Hover, Trigger etc.) */}
      <div className="pt-4 border-t border-gray-100 italic text-xs text-gray-400">
        Button specialized settings (Hover, Trigger) will be added here.
      </div>
    </div>
  );
}
