"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import NumberInput from "../atoms/NumberInput";
import SelectInput from "../atoms/SelectInput";

interface PositionSectionProps {
  node: WcxNode;
}

type PositionType = "relative" | "absolute" | "fixed" | "sticky";

export default function PositionSection({ node }: PositionSectionProps) {
  const updateNode = useUpdateNode();
  const positionType = (node.style.position as PositionType) || "relative";

  const handleStyleChange = (key: string, value: any) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const handlePositionTypeChange = (type: PositionType) => {
    if (type === "relative") {
      updateNode(node.id, {
        style: {
          ...node.style,
          position: type,
          top: undefined,
          right: undefined,
          bottom: undefined,
          left: undefined,
        },
      });
    } else {
      handleStyleChange("position", type);
    }
  };

  const showOffsets = positionType === "absolute" || positionType === "fixed";
  const showStickyTop = positionType === "sticky";

  return (
    <>
      {/* Absolute / Fixed → T R B L */}
      {showOffsets && (
        <>
          <FieldRow label="Top">
            <NumberInput
              value={parseInt(String(node.style.top)) || 0}
              onChange={(v) => handleStyleChange("top", v)}
            />
          </FieldRow>
          <FieldRow label="Right">
            <NumberInput
              value={parseInt(String(node.style.right)) || 0}
              onChange={(v) => handleStyleChange("right", v)}
            />
          </FieldRow>
          <FieldRow label="Bottom">
            <NumberInput
              value={parseInt(String(node.style.bottom)) || 0}
              onChange={(v) => handleStyleChange("bottom", v)}
            />
          </FieldRow>
          <FieldRow label="Left">
            <NumberInput
              value={parseInt(String(node.style.left)) || 0}
              onChange={(v) => handleStyleChange("left", v)}
            />
          </FieldRow>
        </>
      )}

      {/* Sticky → Top only */}
      {showStickyTop && (
        <FieldRow label="Top">
          <NumberInput
            value={parseInt(String(node.style.top)) || 0}
            onChange={(v) => handleStyleChange("top", v)}
          />
        </FieldRow>
      )}

      {/* Type 드롭다운 — 항상 표시 */}
      <FieldRow label="Type">
        <SelectInput
          value={positionType}
          options={[
            { label: "Relative", value: "relative" },
            { label: "Absolute", value: "absolute" },
            { label: "Fixed", value: "fixed" },
            { label: "Sticky", value: "sticky" },
          ]}
          onChange={(v) => handlePositionTypeChange(v as PositionType)}
        />
      </FieldRow>
    </>
  );
}
