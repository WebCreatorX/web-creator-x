"use client";

import { TextNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import SidebarItem from "../atoms/SidebarItem";
import TextInput from "../atoms/TextInput";
import SelectInput from "../atoms/SelectInput";
import NumberInput from "../atoms/NumberInput";
import ColorInput from "../atoms/ColorInput";
import ToggleButtonGroup from "../atoms/ToggleButtonGroup";
import ControlRow from "../atoms/ControlRow";
import AlignPicker from "../atoms/AlignPicker";

interface TextPanelProps {
  node: TextNode;
}

export default function TextPanel({ node }: TextPanelProps) {
  const updateNode = useUpdateNode();

  const handlePropChange = (key: string, value: string | number | boolean | object) => {
    updateNode(node.id, { props: { ...node.props, [key]: value } });
  };

  const handleStyleChange = (key: string, value: string | number | boolean | object) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Text Content - Added as per request */}
      <SidebarItem label="Text Content">
        <TextInput
          value={node.props.text}
          onChange={(val) => handlePropChange("text", val)}
          placeholder="Enter text..."
        />
      </SidebarItem>

      {/* 2. Font Family */}
      <SidebarItem label="Font Family">
        <SelectInput
          value={String(node.style.fontFamily || "Inter")}
          options={[
            { label: "Inter", value: "Inter" },
            { label: "Noto Sans", value: "Noto Sans" },
            { label: "Roboto", value: "Roboto" },
          ]}
          onChange={(val) => handleStyleChange("fontFamily", val)}
        />
      </SidebarItem>

      {/* 3. Size & Weight */}
      <ControlRow>
        <SidebarItem label="Size">
          <NumberInput
            value={parseInt(String(node.style.fontSize)) || 16}
            onChange={(val) => handleStyleChange("fontSize", `${val}px`)}
          />
        </SidebarItem>
        <SidebarItem label="Weight">
          <SelectInput
            value={String(node.style.fontWeight || "400")}
            options={[
              { label: "Light", value: "300" },
              { label: "Regular", value: "400" },
              { label: "Medium", value: "500" },
              { label: "Semibold", value: "600" },
              { label: "Bold", value: "700" },
            ]}
            onChange={(val) => handleStyleChange("fontWeight", val)}
          />
        </SidebarItem>
      </ControlRow>

      {/* 4. Color */}
      <SidebarItem label="Color">
        <ColorInput
          value={String(node.style.color || "#000000")}
          onChange={(val) => handleStyleChange("color", val)}
        />
      </SidebarItem>

      {/* 5. Style (Italic, Underline, Strike) */}
      <SidebarItem label="Style">
        <ToggleButtonGroup
          value={[
            String(node.style.fontStyle === "italic" ? "italic" : ""),
            String(node.style.textDecoration || "none"),
          ].filter((v) => v !== "" && v !== "none")}
          options={[
            { label: "I", value: "italic" },
            { label: "U", value: "underline" },
            { label: "S", value: "line-through" },
          ]}
          onChange={(val) => {
            if (val === "italic") {
              handleStyleChange("fontStyle", node.style.fontStyle === "italic" ? "normal" : "italic");
            } else {
              handleStyleChange("textDecoration", node.style.textDecoration === val ? "none" : val);
            }
          }}
        />
      </SidebarItem>

      {/* 6. Alignment (Horizontal & Vertical) */}
      <SidebarItem label="Distribute">
        <SelectInput
          value={String(node.style.justifyContent || "center")}
          options={[
            { label: "Start", value: "flex-start" },
            { label: "Center", value: "center" },
            { label: "End", value: "flex-end" },
            { label: "Space Between", value: "space-between" },
            { label: "Space Around", value: "space-around" },
            { label: "Space Evenly", value: "space-evenly" },
          ]}
          onChange={(val) => handleStyleChange("justifyContent", val)}
        />
      </SidebarItem>

      <SidebarItem label="Align">
        <AlignPicker
          direction={(node.style.flexDirection as "row" | "column") || "row"}
          value={String(node.style.alignItems || "center")}
          onChange={(val) => handleStyleChange("alignItems", val)}
        />
      </SidebarItem>

      {/* 7. Line Height & Letter Spacing */}
      <ControlRow>
        <SidebarItem label="Line Height">
          <NumberInput
            value={parseInt(String(node.style.lineHeight)) || 100}
            onChange={(val) => handleStyleChange("lineHeight", `${val}%`)}
          />
        </SidebarItem>
        <SidebarItem label="Letter Spacing">
          <NumberInput
            value={parseInt(String(node.style.letterSpacing)) || 0}
            onChange={(val) => handleStyleChange("letterSpacing", `${val}px`)}
          />
        </SidebarItem>
      </ControlRow>

      {/* 8. Heading Level */}
      <SidebarItem label="Heading Level">
        <ToggleButtonGroup
          value={node.props.level}
          options={[
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "P", value: "h5" },
          ]}
          onChange={(val) => handlePropChange("level", val)}
        />
      </SidebarItem>
    </div>
  );
}
