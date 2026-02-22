"use client";

import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode, useUpdateNodeLayout, useCurNodes, useCanvas } from "@/stores/useEditorStore";
import FieldRow from "../atoms/FieldRow";
import NumberInput from "../atoms/NumberInput";
import SelectInput from "../atoms/SelectInput";

interface SizeSectionProps {
  node: WcxNode;
}

type SizingMode = "fixed" | "fill" | "fit" | "relative";

/**
 * DOM에서 노드의 실제 렌더링 크기를 읽어옵니다 (canvas scale 보정 포함).
 */
function getComputedNodeSize(nodeId: string, scale: number) {
  const el = document.querySelector(`[data-component-id="${nodeId}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { width: rect.width / scale, height: rect.height / scale };
}

/**
 * 부모의 content-box 크기를 계산합니다 (padding 제외).
 */
function getParentContentSize(parentId: string | null, scale: number) {
  if (!parentId) return null;
  const el = document.querySelector(`[data-component-id="${parentId}"]`);
  if (!el) return null;
  const computed = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  return {
    width:
      rect.width / scale -
      parseFloat(computed.paddingLeft) -
      parseFloat(computed.paddingRight),
    height:
      rect.height / scale -
      parseFloat(computed.paddingTop) -
      parseFloat(computed.paddingBottom),
  };
}

export default function SizeSection({ node }: SizeSectionProps) {
  const updateLayout = useUpdateNodeLayout();
  const updateNode = useUpdateNode();
  const nodes = useCurNodes();
  const canvas = useCanvas();

  const widthMode: SizingMode = node.layout.widthMode || "fixed";
  const heightMode: SizingMode = node.layout.heightMode || "fixed";

  const widthValue = typeof node.layout.width === "number"
    ? node.layout.width
    : parseInt(String(node.layout.width)) || 0;

  const heightValue = typeof node.layout.height === "number"
    ? node.layout.height
    : parseInt(String(node.layout.height)) || 0;

  // 부모 노드 정보 (금지 조합 판단용)
  const parentNode = nodes?.find(n => n.id === node.parent_id);
  const isInStack = parentNode?.type === "Stack";
  const parentWidthMode = parentNode?.layout.widthMode || "fixed";
  const parentHeightMode = parentNode?.layout.heightMode || "fixed";

  const handleStyleChange = (key: string, value: string | number) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  /**
   * 모드 전환 시 값 변환.
   * DOM에서 현재 노드의 실제 렌더링 크기를 읽어와서 정확한 변환을 수행합니다.
   */
  const convertValue = (
    oldValue: number,
    oldMode: SizingMode,
    newMode: SizingMode,
    isHeight: boolean,
  ) => {
    if (oldMode === newMode) return oldValue;
    if (newMode === "fill") return 1;
    if (newMode === "fit") return oldValue;

    const scale = canvas.scale || 1;

    // → fixed로 전환: DOM에서 현재 렌더링 크기 읽기
    if (newMode === "fixed") {
      const size = getComputedNodeSize(node.id, scale);
      if (size) {
        return Math.round(isHeight ? size.height : size.width);
      }
      return oldValue; // DOM 접근 실패 시 폴백
    }

    // → relative로 전환: DOM에서 현재 크기 + 부모 content-box 기준 계산
    if (newMode === "relative") {
      const size = getComputedNodeSize(node.id, scale);
      const parentContent = getParentContentSize(node.parent_id, scale);
      if (size && parentContent) {
        const childPx = isHeight ? size.height : size.width;
        const parentPx = isHeight ? parentContent.height : parentContent.width;
        return parentPx > 0 ? Math.round((childPx / parentPx) * 100) : 100;
      }
      return oldValue; // 폴백
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

    // fit으로 전환 시: fill인 자식들을 자동으로 fixed로 변환 (현재 렌더링 크기 스냅)
    if (newMode === "fit" && nodes) {
      const scale = canvas.scale || 1;
      const children = nodes.filter((n) => n.parent_id === node.id);

      children.forEach((child) => {
        const childMode = isHeight ? child.layout.heightMode : child.layout.widthMode;
        if (childMode !== "fill") return;

        // DOM에서 현재 렌더링 크기 스냅
        const size = getComputedNodeSize(child.id, scale);
        const snappedValue = size
          ? Math.round(isHeight ? size.height : size.width)
          : (typeof child.layout[sizeKey] === "number" ? child.layout[sizeKey] : 100);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateLayout(child.id, { [key]: "fixed", [sizeKey]: snappedValue } as any);
      });
    }
  };

  // 금지 조합: fill/relative는 부모가 fit이거나 Stack이 아닌 경우 비활성
  const widthModeOptions = [
    { label: "Fixed", value: "fixed" },
    { label: "Rel", value: "relative", disabled: parentWidthMode === "fit" },
    { label: "Fill", value: "fill", disabled: parentWidthMode === "fit" || !isInStack },
    { label: "Fit", value: "fit" },
  ];

  const heightModeOptions = [
    { label: "Fixed", value: "fixed" },
    { label: "Rel", value: "relative", disabled: parentHeightMode === "fit" },
    { label: "Fill", value: "fill", disabled: parentHeightMode === "fit" || !isInStack },
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

