"use client";

interface FieldRowProps {
  label: string;
  children: React.ReactNode;
}

/**
 * 사이드바 필드 행 — 가로 한 줄
 * [라벨]              [컨트롤]
 */
export default function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div className="flex items-start justify-between min-h-[26px] px-1 py-[2px]">
      <span className="text-[12px] text-zinc-500 font-medium shrink-0 w-[72px] h-[26px] flex items-center">
        {label}
      </span>
      <div className="flex-1 min-w-0 flex justify-end gap-[10px]">
        {children}
      </div>
    </div>
  );
}
