"use client";

import { cn } from "@repo/utils";

interface ConstraintPickerProps {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  onChange: (constraints: { top: boolean; right: boolean; bottom: boolean; left: boolean }) => void;
}

/**
 * Framer의 시각적 Position Constraint Picker
 * 중앙 점 + 상/하/좌/우 연결선을 클릭하여 핀 활성화/비활성화
 */
export default function ConstraintPicker({
  top,
  right,
  bottom,
  left,
  onChange,
}: ConstraintPickerProps) {
  const toggle = (key: "top" | "right" | "bottom" | "left") => {
    onChange({ top, right, bottom, left, [key]: !{ top, right, bottom, left }[key] });
  };

  return (
    <div className="relative w-[100px] h-[100px] flex items-center justify-center">
      {/* 중앙 점 */}
      <div className="absolute w-3 h-3 rounded-full bg-blue-500 z-10" />

      {/* Top 연결선 */}
      <button
        type="button"
        onClick={() => toggle("top")}
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-md transition-all",
          top ? "bg-white shadow-sm border border-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
        )}
      >
        <div className={cn("w-[2px] h-4", top ? "bg-blue-500" : "bg-zinc-300")} />
      </button>

      {/* Bottom 연결선 */}
      <button
        type="button"
        onClick={() => toggle("bottom")}
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-md transition-all",
          bottom ? "bg-white shadow-sm border border-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
        )}
      >
        <div className={cn("w-[2px] h-4", bottom ? "bg-blue-500" : "bg-zinc-300")} />
      </button>

      {/* Left 연결선 */}
      <button
        type="button"
        onClick={() => toggle("left")}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md transition-all",
          left ? "bg-white shadow-sm border border-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
        )}
      >
        <div className={cn("h-[2px] w-4", left ? "bg-blue-500" : "bg-zinc-300")} />
      </button>

      {/* Right 연결선 */}
      <button
        type="button"
        onClick={() => toggle("right")}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-md transition-all",
          right ? "bg-white shadow-sm border border-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
        )}
      >
        <div className={cn("h-[2px] w-4", right ? "bg-blue-500" : "bg-zinc-300")} />
      </button>
    </div>
  );
}
