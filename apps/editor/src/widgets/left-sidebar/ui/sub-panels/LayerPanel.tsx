import { PanelBaseLayout } from './base/PanelBaseLayout';
import { useCurNodes, useSelectNode, useSelectedNodeId } from '../../../../stores/useEditorStore';
import { cn } from '@repo/utils';
import {
  Type,
  Image as ImageIcon,
  Heading1,
  Square,
  Box,
  Layout,
  Component,
  ChevronRight,
  ChevronDown,
  Layers,
  LucideIcon
} from 'lucide-react';
import { useState } from 'react';
import { WcxNode } from '@repo/ui/types/nodes';

/**
 * 노드 타입별 아이콘 매핑
 */
const NODE_TYPE_ICONS: Record<string, LucideIcon> = {
  Text: Type,
  Image: ImageIcon,
  Heading: Heading1,
  Button: Square,
  Container: Box,
  Stack: Layout,
  Group: Component,
  Modal: Layout,
};

interface LayerItemProps {
  node: WcxNode;        // 현재 렌더링할 노드
  nodes: WcxNode[];     // 전체 노드 배열 (자식 탐색용)
  selectedId: string | null; // 현재 선택된 노드 ID
  onSelect: (id: string) => void; // 노드 선택 핸들러
  depth: number;        // 계층 깊이 (들여쓰기 계산용)
}

/**
 * 개별 레이어 아이템 컴포넌트 (재귀적으로 자식 노드 렌더링)
 */
const LayerItem = ({ node, nodes, selectedId, onSelect, depth }: LayerItemProps) => {
  // 폴더 접기/펴기 상태
  const [isExpanded, setIsExpanded] = useState(true);

  // 현재 노드를 부모로 가지는 자식 노드들을 필터링하고 position 순으로 정렬
  const children = nodes
    .filter((n) => n.parent_id === node.id)
    .sort((a, b) => a.position - b.position);

  const hasChildren = children.length > 0;
  const isSelected = selectedId === node.id;
  const Icon = NODE_TYPE_ICONS[node.type] || Box;

  /**
   * 레이어 리스트에 표시될 노드의 이름 결정
   * 1. 텍스트 컴포넌트면 해당 텍스트 내용 우선
   * 2. 이미지면 alt 텍스트 우선
   * 3. 위 조건에 해당 없으면 노드 타입 표시
   */
  const getNodeName = () => {
    if ('props' in node) {
      const props = node.props as Record<string, unknown>;
      if (props.text) return props.text as string;
      if (props.alt) return props.alt as string;
    }
    return node.type;
  };

  return (
    <div className="flex flex-col">
      {/* 레이어 행 (클릭 시 선택) */}
      <div
        className={cn(
          "group flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer transition-all duration-200",
          isSelected
            ? "bg-zinc-900 text-white" // 선택 시 어두운 테마
            : "text-zinc-600 hover:bg-zinc-100"
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px` }} // 깊이에 따른 들여쓰기
        onClick={() => onSelect(node.id)}
      >
        {/* 접기/펴기 버튼 (자식이 있을 때만 노출) */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // 부모 행 클릭 이벤트(노드 선택) 막기
                setIsExpanded(!isExpanded);
              }}
              className={cn(
                "p-0.5 rounded transition-colors",
                isSelected ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
              )}
            >
              {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
            </button>
          )}
        </div>

        {/* 노드 타입 아이콘 */}
        <Icon
          size={14}
          strokeWidth={isSelected ? 2.5 : 2}
          className={cn(
            "shrink-0",
            isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"
          )}
        />

        {/* 노드 이름 */}
        <span className={cn(
          "text-[12px] truncate flex-1",
          isSelected ? "font-semibold" : "font-medium"
        )}>
          {getNodeName()}
        </span>
      </div>

      {/* 자식 노드 재귀 호출 */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col mt-0.5">
          {children.map((child) => (
            <LayerItem
              key={child.id}
              node={child}
              nodes={nodes}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * 레이어 패널 메인 컴포넌트
 */
export const LayerPanel = () => {
  // 스토어에서 전체 노드와 선택 정보 가져오기
  const nodes = useCurNodes() || [];
  const selectedId = useSelectedNodeId();
  const selectNode = useSelectNode();

  // 최상위 노드(부모가 없는 노드)들만 먼저 추출
  const rootNodes = nodes
    .filter((node) => node.parent_id === null)
    .sort((a, b) => a.position - b.position);

  return (
    <PanelBaseLayout
      title="레이어"
      description="페이지 구성 요소 계층"
    >
      <div className="flex flex-col gap-0.5 p-2">
        {rootNodes.length > 0 ? (
          // 최상위 노드부터 렌더링 시작 (이후 내부에서 자식들을 재귀적으로 그림)
          rootNodes.map((node) => (
            <LayerItem
              key={node.id}
              node={node}
              nodes={nodes}
              selectedId={selectedId}
              onSelect={selectNode}
              depth={0} // 루트는 깊이 0
            />
          ))
        ) : (
          // 노드가 없을 때의 빈 화면
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Layers className="w-8 h-8 text-zinc-200 mb-2" />
            <p className="text-xs text-zinc-400">레이어가 없습니다.<br />컴포넌트를 추가해보세요.</p>
          </div>
        )}
      </div>
    </PanelBaseLayout>
  );
};
