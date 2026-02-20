import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import DirectionToggle from "../atoms/DirectionToggle";
import AlignPicker from "../atoms/AlignPicker";
import SelectInput from "../atoms/SelectInput";
import ToggleButtonGroup from "../atoms/ToggleButtonGroup";
import SliderInput from "../atoms/SliderInput";
import PaddingInput from "../atoms/PaddingInput";
import NumberInput from "../atoms/NumberInput";

interface LayoutSectionProps {
  node: WcxNode;
}

export default function LayoutSection({ node }: LayoutSectionProps) {
  const updateNode = useUpdateNode();

  const handleStyleChange = (key: string, value: string | number) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const direction = (node.style.flexDirection as "row" | "column") || "row";
  const wrap = node.style.flexWrap === "wrap";

  // Padding 파싱
  const paddingValue = parseInt(String(node.style.padding)) || 0;
  const paddingTop = parseInt(String(node.style.paddingTop)) || paddingValue;
  const paddingRight = parseInt(String(node.style.paddingRight)) || paddingValue;
  const paddingBottom = parseInt(String(node.style.paddingBottom)) || paddingValue;
  const paddingLeft = parseInt(String(node.style.paddingLeft)) || paddingValue;

  const handlePaddingChange = (padding: { top: number; right: number; bottom: number; left: number }) => {
    if (padding.top === padding.right && padding.right === padding.bottom && padding.bottom === padding.left) {
      updateNode(node.id, {
        style: {
          ...node.style,
          padding: `${padding.top}px`,
          paddingTop: undefined,
          paddingRight: undefined,
          paddingBottom: undefined,
          paddingLeft: undefined,
        },
      });
    } else {
      updateNode(node.id, {
        style: {
          ...node.style,
          padding: undefined,
          paddingTop: `${padding.top}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingLeft: `${padding.left}px`,
        },
      });
    }
  };

  return (
    <>
      {/* Type */}
      <FieldRow label="Type">
        <ToggleButtonGroup
          value="Stack"
          options={[
            { label: "Stack", value: "Stack" },
            { label: "Grid", value: "Grid" },
          ]}
          onChange={() => { }}
        />
      </FieldRow>

      {/* Direction */}
      <FieldRow label="Direction">
        <DirectionToggle
          value={direction}
          onChange={(v) => handleStyleChange("flexDirection", v)}
        />
      </FieldRow>

      {/* Distribute */}
      <FieldRow label="Distribute">
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
          onChange={(v) => handleStyleChange("justifyContent", v)}
        />
      </FieldRow>

      {/* Align */}
      <FieldRow label="Align">
        <AlignPicker
          direction={direction}
          value={String(node.style.alignItems || "center")}
          onChange={(v) => handleStyleChange("alignItems", v)}
        />
      </FieldRow>

      {/* Wrap */}
      <FieldRow label="Wrap">
        <ToggleButtonGroup
          value={wrap ? "Yes" : "No"}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          onChange={(v) => handleStyleChange("flexWrap", v === "Yes" ? "wrap" : "nowrap")}
        />
      </FieldRow>

      {/* Gap */}
      <FieldRow label="Gap">
        <NumberInput
          value={parseInt(String(node.style.gap)) || 0}
          onChange={(v) => handleStyleChange("gap", `${v}px`)}
          size="small"
        />
        <SliderInput
          value={parseInt(String(node.style.gap)) || 0}
          min={0}
          max={100}
          onChange={(v) => handleStyleChange("gap", `${v}px`)}
          size="small"
        />
      </FieldRow>

      {/* Padding */}
      <FieldRow label="Padding">
        <PaddingInput
          top={paddingTop}
          right={paddingRight}
          bottom={paddingBottom}
          left={paddingLeft}
          onChange={handlePaddingChange}
        />
      </FieldRow>
    </>
  );
}
