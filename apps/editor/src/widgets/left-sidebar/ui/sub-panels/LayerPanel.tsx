import { PanelBaseLayout } from './base/PanelBaseLayout';
import { useSelectNode, useSelectedNodeId, useDeleteNode, useAddNode, useChildrenMap, useNodeMap } from '../../../../stores/useEditorStore';
import { COMPONENT_DEFAULTS } from '../../../../shared/lib/component-defaults';
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
  LucideIcon,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { WcxNode } from '@repo/ui/types/nodes';
import LayerContextMenu from '../LayerContextMenu';

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

/* ─────────────────────── Layer Item ─────────────────────── */

interface LayerItemProps {
  node: WcxNode;
  childrenMap: Record<string, WcxNode[]>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, nodeId: string) => void;
  depth: number;
}

const LayerItem = ({ node, childrenMap, selectedId, onSelect, onContextMenu, depth }: LayerItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // childrenMap에서 O(1) 조회 (filter+sort 제거)
  const children = childrenMap[node.id] || [];

  const hasChildren = children.length > 0;
  const isSelected = selectedId === node.id;
  const Icon = NODE_TYPE_ICONS[node.type] || Box;

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
      <div
        className={cn(
          "group flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer transition-all duration-200",
          isSelected
            ? "bg-zinc-900 text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        )}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        onClick={() => onSelect(node.id)}
        onContextMenu={(e) => onContextMenu(e, node.id)}
      >
        <div className="w-4 h-4 flex items-center justify-center shrink-0">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
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

        <Icon
          size={14}
          strokeWidth={isSelected ? 2.5 : 2}
          className={cn(
            "shrink-0",
            isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"
          )}
        />

        <span className={cn(
          "text-[12px] truncate flex-1",
          isSelected ? "font-semibold" : "font-medium"
        )}>
          {getNodeName()}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div className="flex flex-col mt-0.5">
          {children.map((child) => (
            <LayerItem
              key={child.id}
              node={child}
              childrenMap={childrenMap}
              selectedId={selectedId}
              onSelect={onSelect}
              onContextMenu={onContextMenu}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Layer Panel ─────────────────────── */

export const LayerPanel = () => {
  const nodeMap = useNodeMap();
  const childrenMap = useChildrenMap();
  const selectedId = useSelectedNodeId();
  const selectNode = useSelectNode();
  const deleteNode = useDeleteNode();
  const addNode = useAddNode();

  // 우클릭 컨텍스트 메뉴 상태
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string;
    nodeType: WcxNode["type"];
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    // nodeMap에서 O(1) 조회
    const targetNode = nodeMap[nodeId];
    if (!targetNode) return;
    setContextMenu({ x: e.clientX, y: e.clientY, nodeId, nodeType: targetNode.type });
  };

  // 자식 노드 삽입 핸들러
  const handleInsertChild = useCallback(
    (parentId: string, type: WcxNode['type']) => {
      const defaults = COMPONENT_DEFAULTS[type];
      if (!defaults) return;

      // childrenMap에서 형제 수 조회
      const siblingCount = (childrenMap[parentId] || []).length;
      const parentNode = nodeMap[parentId];

      const newNode: WcxNode = {
        id: `${type.toLowerCase()}-${Date.now()}`,
        page_id: parentNode?.page_id ?? 1,
        parent_id: parentId,
        type,
        position: siblingCount,
        layout: { ...defaults.layout },
        props: { ...defaults.props },
        style: {
          ...defaults.style,
          position: 'relative',
        },
        created_at: new Date().toISOString(),
      } as WcxNode;

      addNode(newNode);
    },
    [childrenMap, nodeMap, addNode],
  );

  // 루트 노드: childrenMap["__root__"]에서 바로 조회 (이미 정렬됨)
  const rootNodes = childrenMap["__root__"] || [];

  return (
    <PanelBaseLayout title="레이어" description="페이지 구성 요소 계층">
      <div className="flex flex-col gap-0.5 p-2">
        {rootNodes.length > 0 ? (
          rootNodes.map((node) => (
            <LayerItem
              key={node.id}
              node={node}
              childrenMap={childrenMap}
              selectedId={selectedId}
              onSelect={selectNode}
              onContextMenu={handleContextMenu}
              depth={0}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Layers className="w-8 h-8 text-zinc-200 mb-2" />
            <p className="text-xs text-zinc-400">레이어가 없습니다.<br />컴포넌트를 추가해보세요.</p>
          </div>
        )}
      </div>

      {contextMenu && (
        <LayerContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          nodeType={contextMenu.nodeType}
          onDelete={deleteNode}
          onInsert={handleInsertChild}
          onClose={() => setContextMenu(null)}
        />
      )}
    </PanelBaseLayout>
  );
};
