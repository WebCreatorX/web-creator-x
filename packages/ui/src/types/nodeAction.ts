export type ActionType =
  | "link" // 5. 링크 이동
  | "scroll" // 3. 스크롤 이동
  | "alert" // 2. 알림창
  | "modal" // 4. 모달 열기
  | "mutation"; // 1. 데이터 변경 (핵심!) -> 무시

export interface NodeAction {
  type: ActionType;

  // 공통 페이로드 (링크 URL, 알림 메시지, 타겟 ID 등)
  payload?: string;

  // mutation용 설정
  targetId?: string; // 변경할 노드의 ID (ex: "text-node-123")
  mutationType?: "increment" | "setText" | "toggle"; // 구체적인 변경 방식
  value?: any; // 변경할 값
}
