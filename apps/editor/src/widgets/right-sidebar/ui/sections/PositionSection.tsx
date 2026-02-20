"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode, useUpdateNodeLayout } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import NumberInput from "../atoms/NumberInput";
import SelectInput from "../atoms/SelectInput";

interface PositionSectionProps {
  node: WcxNode;
}

type PositionType = "relative" | "absolute" | "fixed" | "sticky";

export default function PositionSection({ node }: PositionSectionProps) {
  const updateNode = useUpdateNode();
  const updateNodeLayout = useUpdateNodeLayout();
  const positionType = (node.style.position as PositionType) || "relative";

  const handleStyleChange = (key: string, value: string | number | undefined) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const handleLayoutChange = (key: string, value: string | number) => {
    updateNodeLayout(node.id, { [key]: value });
  };

  const handlePositionTypeChange = (type: PositionType) => {
    if (type === "relative") {
      // relative 전환 시 스타일에서 위치 정보 제거
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
      // x, y 좌표는 유지하거나 필요에 따라 초기화할 수 있지만 일단 유지
    } else {
      handleStyleChange("position", type);
    }
  };

  const showOffsets = positionType === "absolute" || positionType === "fixed";
  const showStickyTop = positionType === "sticky";

  return (
    <>
      {/* Absolute / Fixed → Top(y) / Left(x) (Layout 필드 사용) */}
      {showOffsets && (
        <>
          <FieldRow label="Top">
            <NumberInput
              value={node.layout.y ?? 0}
              onChange={(v) => handleLayoutChange("y", v)}
            />
          </FieldRow>
          <FieldRow label="Left">
            <NumberInput
              value={node.layout.x ?? 0}
              onChange={(v) => handleLayoutChange("x", v)}
            />
          </FieldRow>
        </>
      )}

      {/* Sticky → Top only (y 사용) */}
      {showStickyTop && (
        <FieldRow label="Top">
          <NumberInput
            value={node.layout.y ?? 0}
            onChange={(v) => handleLayoutChange("y", v)}
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
