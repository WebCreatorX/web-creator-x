// 임시 Mock 데이터 Hook
// 실제 DB 연동 전까지 데이터 구조를 테스트 용도로 사용합니다.

import { ModalNode } from "../types/nodes";


//실제로는 id를 입력받으면 DB에서 해당하는 id의 노드데이터를 가져와서 반환하는 함수
export function useProjectData(id: string | null) {
  if (!id) return { modal: null };
  const modal: ModalNode = {
    id: "modal-sample-1",
    type: "Modal",
    page_id: "global",
    parent_id: null,
    position: 0,
    style: {},
    layout: { x: 0, y: 0, width: 400, height: 300, zIndex: 100 },
    props: {
      alignment: "center",
      overlayColor: "bg-black/50",
      closeOnOverlayClick: true,
    },
  };

  return { modal };
}
