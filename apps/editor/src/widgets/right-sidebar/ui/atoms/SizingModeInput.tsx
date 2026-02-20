"use client";

import { cn } from "@repo/utils";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type SizingMode = "fixed" | "fill" | "fit" | "relative";
type Unit = "px" | "%";

interface SizingModeInputProps {
  mode: SizingMode;
  value: number | string;
  unit: Unit;
  label: string; // "W" 또는 "H"
  onModeChange: (mode: SizingMode) => void;
  onValueChange: (value: number) => void;
  onUnitChange: (unit: Unit) => void;
}

const MODE_LABELS: Record<SizingMode, string> = {
  fixed: "Fixed",
  fill: "Fill",
  fit: "Fit",
  relative: "Relative",
};

/**
 * Framer의 Size 입력 컴포넌트
 * 모드 선택 + 값 입력 + 단위 토글
 */
export default function SizingModeInput({
  mode,
  value,
  unit,
  label,
  onModeChange,
  onValueChange,
  onUnitChange,
}: SizingModeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 모드에 따라 입력 비활성화
  const isDisabled = mode === "fill" || mode === "fit";
  const displayValue = isDisabled ? (mode === "fill" ? "1fr" : "auto") : value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* 라벨 */}
      <span className="text-xs text-zinc-400 w-4">{label}</span>

      {/* 모드 드롭다운 */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1.5 text-xs bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors"
        >
          <span>{MODE_LABELS[mode]}</span>
          <ChevronDown size={12} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-200 rounded-md shadow-lg z-20 min-w-[80px]">
            {(Object.keys(MODE_LABELS) as SizingMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  onModeChange(m);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-1.5 text-xs text-left hover:bg-zinc-50 transition-colors",
                  mode === m && "bg-zinc-100 font-medium"
                )}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 값 입력 */}
      <input
        type={isDisabled ? "text" : "number"}
        value={displayValue}
        disabled={isDisabled}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          "w-16 px-2 py-1.5 text-xs border border-zinc-200 rounded-md text-center",
          isDisabled && "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        )}
      />

      {/* 단위 토글 */}
      {!isDisabled && (
        <button
          type="button"
          onClick={() => onUnitChange(unit === "px" ? "%" : "px")}
          className="px-2 py-1.5 text-xs bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors min-w-[32px]"
        >
          {unit}
        </button>
      )}
    </div>
  );
}
