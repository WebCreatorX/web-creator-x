"use client";

import { cn } from "@repo/utils";
import { MoveHorizontal, MoveVertical } from "lucide-react";

interface DirectionToggleProps {
  value: "row" | "column";
  onChange: (val: "row" | "column") => void;
}

export default function DirectionToggle({ value, onChange }: DirectionToggleProps) {
  return (
    <div className="flex flex-row gap-1.5 bg-[#F4F4F5] p-1 rounded-[8px] w-fit">
      <button
        type="button"
        onClick={() => onChange("row")}
        className={cn(
          "flex h-7 w-9 items-center justify-center rounded-[6px] transition-all",
          value === "row"
            ? "bg-white shadow-sm text-[#8B5CF6]"
            : "text-zinc-400 hover:text-zinc-600"
        )}
        title="Horizontal (Row)"
      >
        <MoveHorizontal size={18} />
      </button>
      <button
        type="button"
        onClick={() => onChange("column")}
        className={cn(
          "flex h-7 w-9 items-center justify-center rounded-[6px] transition-all",
          value === "column"
            ? "bg-white shadow-sm text-[#8B5CF6]"
            : "text-zinc-400 hover:text-zinc-600"
        )}
        title="Vertical (Column)"
      >
        <MoveVertical size={18} />
      </button>
    </div>
  );
}
