/**
 * 사이징 모드 전환 비즈니스 로직을 캡슐화하는 커스텀 훅.
 *
 * - 모드 전환 시 값 자동 변환
 * - fit 전환 시 fill인 자식을 fixed로 cascade 전환
 * - useNodeMap / useChildrenMap 활용으로 O(1) 조회
 */

import { WcxNode } from "@repo/ui/types/nodes";
import {
  useUpdateNodeLayout,
  useNodeMap,
  useChildrenMap,
  useCanvas,
} from "@/stores/useEditorStore";
import {
  type SizingMode,
  convertSizingValue,
  getComputedNodeSize,
} from "../lib/sizingConversion";

export function useSizeModeChange(node: WcxNode) {
  const updateLayout = useUpdateNodeLayout();
  const nodeMap = useNodeMap();
  const childrenMap = useChildrenMap();
  const canvas = useCanvas();

  // O(1) 부모 노드 조회
  const parentNode = node.parent_id ? nodeMap[node.parent_id] : undefined;
  const isInStack = parentNode?.type === "Stack";
  const parentWidthMode: SizingMode = parentNode?.layout.widthMode || "fixed";
  const parentHeightMode: SizingMode = parentNode?.layout.heightMode || "fixed";

  const handleModeChange = (
    key: "widthMode" | "heightMode",
    newMode: SizingMode,
  ) => {
    const isHeight = key === "heightMode";
    const sizeKey = isHeight ? "height" : "width";
    const oldMode: SizingMode = isHeight
      ? (node.layout.heightMode || "fixed")
      : (node.layout.widthMode || "fixed");
    const oldValue: number = isHeight
      ? (typeof node.layout.height === "number"
        ? node.layout.height
        : parseInt(String(node.layout.height)) || 0)
      : (typeof node.layout.width === "number"
        ? node.layout.width
        : parseInt(String(node.layout.width)) || 0);

    const scale = canvas.scale || 1;

    const newValue = convertSizingValue({
      oldValue,
      oldMode,
      newMode,
      isHeight,
      nodeId: node.id,
      parentId: node.parent_id,
      scale,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateLayout(node.id, { [key]: newMode, [sizeKey]: newValue } as any);

    // fit으로 전환 시: fill인 자식들을 자동으로 fixed로 변환 (현재 렌더링 크기 스냅)
    if (newMode === "fit") {
      // O(1) 자식 조회
      const children = childrenMap[node.id] ?? [];

      children.forEach((child: WcxNode) => {
        const childMode = isHeight
          ? child.layout.heightMode
          : child.layout.widthMode;
        if (childMode !== "fill") return;

        // DOM에서 현재 렌더링 크기 스냅
        const size = getComputedNodeSize(child.id, scale);
        const snappedValue = size
          ? Math.round(isHeight ? size.height : size.width)
          : typeof child.layout[sizeKey] === "number"
            ? child.layout[sizeKey]
            : 100;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateLayout(child.id, { [key]: "fixed", [sizeKey]: snappedValue } as any);
      });
    }
  };

  return {
    handleModeChange,
    parentNode,
    isInStack,
    parentWidthMode,
    parentHeightMode,
  };
}
