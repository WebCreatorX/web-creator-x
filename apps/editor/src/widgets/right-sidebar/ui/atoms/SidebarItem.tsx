"use client";

interface SidebarItemProps {
  label: string;
  children: React.ReactNode;
}

/**
 * 모든 사이드바 입력 요소의 공통 래퍼
 */
export default function SidebarItem({ label, children }: SidebarItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-inter font-medium text-[12px] leading-none text-[#71717A]">
        {label}
      </span>
      {children}
    </div>
  );
}
