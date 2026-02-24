"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode, useUpdateNodeLayout } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import NumberInput from "../atoms/NumberInput";
import SelectInput from "../atoms/SelectInput";
import { type SizingMode } from "../../lib/sizingConversion";
import { getSizingModeOptions } from "../../lib/sizingOptions";
import { useSizeModeChange } from "../../hooks/useSizeModeChange";

interface SizeSectionProps {
  node: WcxNode;
}

export default function SizeSection({ node }: SizeSectionProps) {
  const updateLayout = useUpdateNodeLayout();
  const updateNode = useUpdateNode();

  const {
    handleModeChange,
    isInStack,
    parentWidthMode,
    parentHeightMode,
  } = useSizeModeChange(node);

  const widthMode: SizingMode = node.layout.widthMode || "fixed";
  const heightMode: SizingMode = node.layout.heightMode || "fixed";

  const widthValue = typeof node.layout.width === "number"
    ? node.layout.width
    : parseInt(String(node.layout.width)) || 0;

  const heightValue = typeof node.layout.height === "number"
    ? node.layout.height
    : parseInt(String(node.layout.height)) || 0;

  const handleStyleChange = (key: string, value: string | number) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const widthModeOptions = getSizingModeOptions({ parentMode: parentWidthMode, isInStack });
  const heightModeOptions = getSizingModeOptions({ parentMode: parentHeightMode, isInStack });

  return (
    <>
      {/* Width: 값 / 모드 */}
      <FieldRow label="Width">
        <NumberInput
          value={widthValue}
          onChange={(v) => updateLayout(node.id, { width: v })}
          size="small"
          suffix={widthMode === "relative" ? "%" : widthMode === "fill" ? "fr" : undefined}
          blurred={widthMode === "fit"}
        />
        <SelectInput
          value={widthMode}
          options={widthModeOptions}
          onChange={(v) => handleModeChange("widthMode", v as SizingMode)}
          size="small"
        />
      </FieldRow>

      {/* Height: 값 / 모드 */}
      <FieldRow label="Height">
        <NumberInput
          value={heightValue}
          onChange={(v) => updateLayout(node.id, { height: v })}
          size="small"
          suffix={heightMode === "relative" ? "%" : heightMode === "fill" ? "fr" : undefined}
          blurred={heightMode === "fit"}
        />
        <SelectInput
          value={heightMode}
          options={heightModeOptions}
          onChange={(v) => handleModeChange("heightMode", v as SizingMode)}
          size="small"
        />
      </FieldRow>

      {/* Min Width */}
      <FieldRow label="Min W">
        <NumberInput
          value={parseInt(String(node.style.minWidth)) || 0}
          onChange={(v) => handleStyleChange("minWidth", v)}
        />
      </FieldRow>

      {/* Max Width */}
      <FieldRow label="Max W">
        <NumberInput
          value={parseInt(String(node.style.maxWidth)) || 0}
          onChange={(v) => handleStyleChange("maxWidth", v)}
        />
      </FieldRow>

      {/* Min Height */}
      <FieldRow label="Min H">
        <NumberInput
          value={parseInt(String(node.style.minHeight)) || 0}
          onChange={(v) => handleStyleChange("minHeight", v)}
        />
      </FieldRow>

      {/* Max Height */}
      <FieldRow label="Max H">
        <NumberInput
          value={parseInt(String(node.style.maxHeight)) || 0}
          onChange={(v) => handleStyleChange("maxHeight", v)}
        />
      </FieldRow>
    </>
  );
}
