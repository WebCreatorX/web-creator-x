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
  // 교차축(Align)의 방향 결정
  // Row(가로)일 때 교차축은 세로 정렬 아이콘이 필요함
  // Column(세로)일 때 교차축은 가로 정렬 아이콘이 필요함
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
    <div className="flex flex-row gap-1.5 bg-[#F4F4F5] p-1 rounded-[8px] w-fit">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = value === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex h-7 w-9 items-center justify-center rounded-[6px] transition-all",
              isActive
                ? "bg-white shadow-sm text-[#8B5CF6]" // 이미지의 보라색 포인트 반영
                : "text-zinc-400 hover:text-zinc-600"
            )}
            title={opt.label}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
