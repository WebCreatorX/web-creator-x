"use client";

import { cn } from "@repo/utils";
import {
  // 수평 정렬용 (교차축이 수평일 때 - Column 모드)
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  // 수직 정렬용 (교차축이 수직일 때 - Row 모드)
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal
} from "lucide-react";

interface AlignPickerProps {
  direction: "row" | "column";
  value: string;
  onChange: (val: string) => void;
}

export default function AlignPicker({ direction, value, onChange }: AlignPickerProps) {
  const isDirectionRow = direction === "row";

  const options = isDirectionRow
    ? [
      { icon: AlignStartHorizontal, value: "flex-start", label: "Top" },
      { icon: AlignCenterHorizontal, value: "center", label: "Middle" },
      { icon: AlignEndHorizontal, value: "flex-end", label: "Bottom" },
    ]
    : [
      { icon: AlignStartVertical, value: "flex-start", label: "Left" },
      { icon: AlignCenterVertical, value: "center", label: "Center" },
      { icon: AlignEndVertical, value: "flex-end", label: "Right" },
    ];

  return (
    <div className="flex flex-row gap-0.5 bg-[#F4F4F5] p-0.5 rounded-[8px] w-[140px] h-[26px]">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = value === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 flex h-full items-center justify-center rounded-[6px] transition-all",
              isActive
                ? "bg-white shadow-sm text-[#8B5CF6]"
                : "text-zinc-400 hover:text-zinc-600"
            )}
            title={opt.label}
          >
            <Icon size={15} />
          </button>
        );
      })}
    </div>
  );
}
