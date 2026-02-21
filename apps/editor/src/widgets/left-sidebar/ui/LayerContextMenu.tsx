/**
 * 레이어 패널 우클릭 컨텍스트 메뉴
 *
 * nodeInsertRules에 따라 삽입 가능한 자식 옵션을 동적으로 표시합니다.
 */
import { useRef, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { WcxNode } from "@repo/ui/types/nodes";
import { getInsertOptions } from "../model/nodeInsertRules";

export interface LayerContextMenuProps {
  x: number;
  y: number;
  nodeId: string;
  nodeType: WcxNode["type"];
  onDelete: (id: string) => void;
  onInsert: (parentId: string, type: WcxNode["type"]) => void;
  onClose: () => void;
}

export default function LayerContextMenu({
  x,
  y,
  nodeId,
  nodeType,
  onDelete,
  onInsert,
  onClose,
}: LayerContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const insertOptions = getInsertOptions(nodeType);

  return (
    <div
      ref={ref}
      className="fixed z-[9999] min-w-[160px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
      style={{ left: x, top: y }}
    >
      {/* 삽입 옵션 (리프 노드면 표시 안 함) */}
      {insertOptions.length > 0 && (
        <>
          {insertOptions.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-zinc-700 hover:bg-zinc-50 transition-colors"
              onClick={() => {
                onInsert(nodeId, type);
                onClose();
              }}
            >
              <Plus size={13} className="text-zinc-400" />
              <Icon size={12} className="text-zinc-400" />
              {label} 삽입
            </button>
          ))}

          {/* 구분선 */}
          <div className="my-1 h-px bg-zinc-100" />
        </>
      )}

      {/* 삭제 */}
      <button
        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => {
          onDelete(nodeId);
          onClose();
        }}
      >
        <Trash2 size={13} />
        삭제
      </button>
    </div>
  );
}
