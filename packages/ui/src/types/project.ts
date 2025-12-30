import { ModalNode } from "./nodes";

export interface ProjectData {
  //pages: PageNode[]; //TODO-PageNode타입 구현 예정
  modal: ModalNode[]; // 모달은 별도 리스트로 관리 (성능 및 재사용성)
}
