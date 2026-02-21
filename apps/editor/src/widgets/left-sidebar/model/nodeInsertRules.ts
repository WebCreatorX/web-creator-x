/**
 * 노드 타입별 자식 삽입 규칙
 *
 * insertableChildren: 해당 노드 타입 안에 삽입 가능한 자식 타입 목록
 * - 빈 배열이면 자식을 가질 수 없는 리프 노드 (Text, Image, Heading, Button 등)
 * - 목록에 포함된 타입만 우클릭 메뉴에 표시
 */
import { WcxNode } from "@repo/ui/types/nodes";
import { LucideIcon, Type, Layout, Heading1, Square } from "lucide-react";

export interface InsertOption {
  type: WcxNode["type"];
  label: string;
  icon: LucideIcon;
}

/**
 * 각 노드 타입이 자식으로 받을 수 있는 타입 목록
 * 여기에 새 노드 타입을 추가하면 컨텍스트 메뉴에 자동 반영됩니다.
 */
const INSERT_OPTIONS_MAP: Record<string, InsertOption[]> = {
  // 리프 노드 (자식 불가)
  Text: [],
  Heading: [],
  Image: [],
  Button: [],

  // 컨테이너 노드 (자식 가능)
  Stack: [
    { type: "Text", label: "텍스트", icon: Type },
    { type: "Heading", label: "헤딩", icon: Heading1 },
    { type: "Stack", label: "스택", icon: Layout },
    { type: "Button", label: "버튼", icon: Square },
  ],
  Container: [
    { type: "Text", label: "텍스트", icon: Type },
    { type: "Stack", label: "스택", icon: Layout },
  ],
  Group: [
    { type: "Text", label: "텍스트", icon: Type },
    { type: "Stack", label: "스택", icon: Layout },
  ],
  Modal: [
    { type: "Text", label: "텍스트", icon: Type },
    { type: "Stack", label: "스택", icon: Layout },
  ],
};

/**
 * 특정 노드 타입에 삽입 가능한 자식 옵션 배열을 반환합니다.
 * @param nodeType 부모 노드의 type
 * @returns InsertOption[] — 비어 있으면 삽입 불가 (리프 노드)
 */
export function getInsertOptions(nodeType: WcxNode["type"]): InsertOption[] {
  return INSERT_OPTIONS_MAP[nodeType] ?? [];
}
