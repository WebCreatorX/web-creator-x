"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode, useUpdateNodeLayout, useCurNodes } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import NumberInput from "../atoms/NumberInput";
import SelectInput from "../atoms/SelectInput";

interface SizeSectionProps {
  node: WcxNode;
}

type SizingMode = "fixed" | "fill" | "fit" | "relative";

export default function SizeSection({ node }: SizeSectionProps) {
  const updateLayout = useUpdateNodeLayout();
  const updateNode = useUpdateNode();
  const nodes = useCurNodes();

  const widthMode: SizingMode = (node.layout as { widthMode: SizingMode }).widthMode || "fixed";
  const heightMode: SizingMode = (node.layout as { heightMode: SizingMode }).heightMode || "fixed";

  const widthValue = typeof node.layout.width === "number"
    ? node.layout.width
    : parseInt(String(node.layout.width)) || 0;

  const heightValue = typeof node.layout.height === "number"
    ? node.layout.height
    : parseInt(String(node.layout.height)) || 0;

  const handleStyleChange = (key: string, value: string | number) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const convertValue = (oldValue: number, oldMode: SizingMode, newMode: SizingMode, isHeight: boolean) => {
    if (oldMode === newMode) return oldValue;
    if (newMode === 'fill') return 1;
    if (newMode === 'fit') return oldValue;

    // Fixed -> Relative
    if (oldMode === 'fixed' && newMode === 'relative') {
      const parent = nodes?.find(n => n.id === node.parent_id);
      const parentSize = isHeight
        ? (typeof parent?.layout.height === 'number' ? parent.layout.height : 1000)
        : (typeof parent?.layout.width === 'number' ? parent.layout.width : 1000);
      return Math.round((oldValue / parentSize) * 100);
    }

    // Relative -> Fixed
    if (oldMode === 'relative' && newMode === 'fixed') {
      const parent = nodes?.find(n => n.id === node.parent_id);
      const parentSize = isHeight
        ? (typeof parent?.layout.height === 'number' ? parent.layout.height : 1000)
        : (typeof parent?.layout.width === 'number' ? parent.layout.width : 1000);
      return Math.round((oldValue / 100) * parentSize);
    }

    return oldValue;
  };

  const handleModeChange = (key: 'widthMode' | 'heightMode', newMode: SizingMode) => {
    const isHeight = key === 'heightMode';
    const sizeKey = isHeight ? 'height' : 'width';
    const oldMode = isHeight ? heightMode : widthMode;
    const oldValue = isHeight ? heightValue : widthValue;

    const newValue = convertValue(oldValue, oldMode, newMode, isHeight);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateLayout(node.id, { [key]: newMode, [sizeKey]: newValue } as any);
  };

  const modeOptions = [
    { label: "Fixed", value: "fixed" },
    { label: "Rel", value: "relative" },
    { label: "Fill", value: "fill" },
    { label: "Fit", value: "fit" },
  ];

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
          options={modeOptions}
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
          options={modeOptions}
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
