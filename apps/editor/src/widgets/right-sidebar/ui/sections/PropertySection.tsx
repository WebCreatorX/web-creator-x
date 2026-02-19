"use client";

import { cn } from "@repo/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface PropertySectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * 사이드바 레이어 섹션
 * --- 구분선 ---
 * Position   [-]
 * (fields...)
 */
export default function PropertySection({ title, defaultOpen = true, children }: PropertySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-zinc-200">
      {/* 헤더 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 group"
      >
        <span className="text-[13px] font-semibold text-zinc-800 tracking-tight">
          {title}
        </span>
        <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* 본문 */}
      {isOpen && (
        <div className="flex flex-col gap-1 pb-3">
          {children}
        </div>
      )}
    </div>
  );
}
