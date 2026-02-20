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
  size?: "single" | "small";
}

export default function ToggleButtonGroup({
  options,
  value,
  onChange,
  size = "single",
}: ToggleButtonGroupProps) {
  const widthClass = size === "small" ? "w-[65px]" : "w-[140px]";

  return (
    <div className={cn("flex flex-row gap-0.5 bg-[#F4F4F5] p-0.5 rounded-[8px] h-[26px]", widthClass)}>
      {options.map((opt) => {
        const isActive = Array.isArray(value)
          ? value.includes(opt.value)
          : value === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 flex h-full items-center justify-center rounded-[6px] text-[11px] font-medium font-inter transition-all",
              isActive
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
