import { WcxNode } from "@repo/ui/types/nodes";
import { useUpdateNode, useUpdateNodeLayout } from "@/stores/useEditorStore";
import SidebarItem from "../atoms/SidebarItem";
import NumberInput from "../atoms/NumberInput";
import DirectionToggle from "../atoms/DirectionToggle";
import AlignPicker from "../atoms/AlignPicker";
import SelectInput from "../atoms/SelectInput";
import ToggleButtonGroup from "../atoms/ToggleButtonGroup";

interface LayoutPanelProps {
  node: WcxNode;
}

export default function LayoutPanel({ node }: LayoutPanelProps) {
  const updateLayout = useUpdateNodeLayout();
  const updateNode = useUpdateNode();

  const handleStyleChange = (key: string, value: any) => {
    updateNode(node.id, { style: { ...node.style, [key]: value } });
  };

  const direction = (node.style.flexDirection as "row" | "column") || "row";

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Type (Stack / Grid) - 이미지의 Type 섹션 */}
      <SidebarItem label="Type">
        <ToggleButtonGroup
          value="Stack"
          options={[
            { label: "Stack", value: "Stack" },
            { label: "Grid", value: "Grid" },
          ]}
          onChange={() => { }} // 추후 확장 가능성
        />
      </SidebarItem>

      {/* 2. Direction - 이미지의 Direction 섹션 */}
      <SidebarItem label="Direction">
        <DirectionToggle
          value={direction}
          onChange={(val) => handleStyleChange("flexDirection", val)}
        />
      </SidebarItem>

      {/* 3. Distribute (Justify Content) - 이미지의 Distribute (Select) 섹션 */}
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

      {/* 4. Align (Align Items) - 이미지의 Align (Icons) 섹션 */}
      <SidebarItem label="Align">
        <AlignPicker
          direction={direction}
          value={String(node.style.alignItems || "center")}
          onChange={(val) => handleStyleChange("alignItems", val)}
        />
      </SidebarItem>

      {/* 5. Wrap & Gap & Padding - 추가적인 유용한 설정들 */}
      <div className="pt-4 border-t border-zinc-100 mt-2 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SidebarItem label="Gap">
            <NumberInput
              value={parseInt(String(node.style.gap)) || 0}
              onChange={(val) => handleStyleChange("gap", `${val}px`)}
            />
          </SidebarItem>
          <SidebarItem label="Padding">
            <NumberInput
              value={parseInt(String(node.style.padding)) || 0}
              onChange={(val) => handleStyleChange("padding", `${val}px`)}
            />
          </SidebarItem>
        </div>
      </div>

      {/* 6. Dimensions (Width & Height) */}
      <div className="pt-4 border-t border-zinc-100">
        <div className="grid grid-cols-2 gap-4">
          <SidebarItem label="Width">
            <NumberInput
              value={node.layout.width}
              onChange={(val) => updateLayout(node.id, { width: val })}
            />
          </SidebarItem>
          <SidebarItem label="Height">
            <NumberInput
              value={node.layout.height}
              onChange={(val) => updateLayout(node.id, { height: val })}
            />
          </SidebarItem>
        </div>
      </div>
    </div>
  );
}
