import { useRuntimeState } from "context/runtimeContext";
import { useProjectData } from "hooks/useProjectData";
import Modal from "./Modal";
import { ModalNode } from "types";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalHost() {
  //Context를 통한 상태 구독
  //TODO-만약 context의 형태가 context API에서 zustand로 바뀐다면 해당 로직도 수정되야 합니다.
  const { activeModalId, closeModal } = useRuntimeState();

  //DB에서 관련 데이터 불러오기
  const { modal: targetNode } = useProjectData(activeModalId);

  // 닫기 핸들러
  const handleClose = () => {
    closeModal();
  };

  const handleOverlayClick = (closeOnOverlayClick?: boolean) => {
    if (closeOnOverlayClick === false) return;
    handleClose();
  };

  // 위치 프리셋
  const alignmentStyles = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-10",
    bottom: "items-end justify-center pb-0",
    left: "items-center justify-start h-full",
    right: "items-center justify-end h-full",
  };

  return (
    <AnimatePresence>
      {activeModalId && targetNode && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-9999 flex ${alignmentStyles[(targetNode.props.alignment || "center") as keyof typeof alignmentStyles]} ${targetNode.props.overlayColor || "bg-black/50"}`}
          onClick={() =>
            handleOverlayClick(targetNode.props.closeOnOverlayClick)
          }
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              node={targetNode}
              props={targetNode.props}
              style={targetNode.style}
            >
              {/* Children */}
            </Modal>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
