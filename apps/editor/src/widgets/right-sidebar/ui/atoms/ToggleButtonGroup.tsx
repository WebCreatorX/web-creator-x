"use client";

import { cn } from "@repo/utils";

interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleButtonGroupProps {
  options: ToggleOption[];
  value: string | string[];
  onChange: (val: string) => void;
}

export default function ToggleButtonGroup({
  options,
  value,
  onChange,
}: ToggleButtonGroupProps) {
  return (
    <div className="flex flex-row gap-1.5">
      {options.map((opt) => {
        const isActive = Array.isArray(value)
          ? value.includes(opt.value)
          : value === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[6px] border text-[14px] font-bold font-inter transition-all",
              isActive
                ? "bg-[#18181B] border-[#18181B] text-white"
                : "bg-white border-[#E4E4E7] text-zinc-900 hover:bg-zinc-50"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
