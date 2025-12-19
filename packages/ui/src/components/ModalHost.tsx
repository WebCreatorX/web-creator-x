import { useRuntimeState } from "context/runtimeContext";
import useProjectData from "hooks/useProjectData";
import Modal from "./Modal";
import { useBuilderMode } from "context/builderMode";
import { ModalNode } from "types";

export default function ModalHost() {
  const { activeModalId } = useRuntimeState();
  if (!activeModalId) return null;

  const targetNode = useProjectData(activeModalId) as ModalNode;

  if (!targetNode) return;

  return (
    <Modal node={targetNode} props={targetNode.props} style={targetNode.style}>
      {
        //모달의 하위 노드들 children으로 렌더링?
      }
    </Modal>
  );
}
