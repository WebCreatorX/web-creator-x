"use client";

import { cn } from "@repo/utils";

interface SliderInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "single" | "small";
}

export default function SliderInput({
  value,
  min = 0,
  max = 100,
  onChange,
  size = "small",
}: SliderInputProps) {
  const widthClass = size === "small" ? "w-[65px]" : "w-[140px]";

  return (
    <div className={cn("flex items-center h-[26px]", widthClass)}>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "w-full h-1 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-[#2563EB]",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
          "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2563EB]",
          "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform",
          "hover:[&::-webkit-slider-thumb]:scale-110"
        )}
      />
    </div>
  );
}
