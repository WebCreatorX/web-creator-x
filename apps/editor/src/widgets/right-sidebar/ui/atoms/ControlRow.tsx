"use client";

import React from "react";

interface ControlRowProps {
  children: React.ReactNode;
}

/**
 * 두 개 이상의 컨트롤을 한 줄에 배치하기 위한 그리드 레이아웃 헬퍼
 */
export default function ControlRow({ children }: ControlRowProps) {
  return (
    <div className="flex flex-row gap-4 items-end">
      {React.Children.map(children, (child) => (
        <div className="flex-1 min-w-0">{child}</div>
      ))}
    </div>
  );
}
