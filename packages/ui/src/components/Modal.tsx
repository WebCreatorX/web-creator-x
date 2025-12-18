import { useBuilderMode } from "context/builderMode";
import { useRuntimeState } from "context/runtimeContext";
import { ModalNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

//TODO-모달 IsOpen상태 관리를 어떻게 최적화 할 수 있을까?

/**
 *
 * @param param0
 * @returns
 *
 * 해당 모달 렌더러를 에디터에서 보여주고 싶다면 기본 상태는 isOpen:flase 이므로 에디터에 한해서만 강제로 updateNodeState(id, { isOpen: true })를 호출해서 보여줘야합니다.
 */
export default function Modal({
  node,
  props,
  style,
  children, //모달안에 들어갈 버튼, 텍스트 등이 children으로 올 수 있습니다.
}: NodeComponentProps<ModalNode>) {
  // Hooks & state
  const { mode } = useBuilderMode();
  const curNodeId = node.id;
  const {
    alignment,
    overlayColor = "",
    closeOnOverlayClick = "",
    animation = "",
  } = props;

  //Context를 통한 상태 구독
  //TODO-만약 context의 형태가 context API에서 zustand로 바뀐다면 해당 로직도 수정되야 합니다.

  
  const {  closeModal } = useRuntimeState();

  // 위치 프리셋에 따른 CSS 클래스 매핑
  const alignmentStyles = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-10",
    bottom: "items-end justify-center pb-0", // 바텀 시트 스타일
    left: "items-center justify-start h-full", // 사이드바
    right: "items-center justify-end h-full", // 사이드바
  };

  const positionClass = alignmentStyles[alignment] || alignmentStyles.center;

  //스타일 변환
  const nodeStyleObj = processNodeStyles(style);

  //닫기 핸들러
  function closeHandler(e?: React.MouseEvent) {
    if (mode === "editor") return;
    e?.stopPropagation();
    closeModal();
  }

  function overlayClickHandler(e?: React.MouseEvent<HTMLDivElement>) {
    if (closeOnOverlayClick === false) return;
    closeHandler(e);
  }

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex ${positionClass} ${overlayColor || `bg-black`}`}
      onClick={(e) => overlayClickHandler(e)}
    >
      {/* 실제 모달 컨테이너 */}
      <div
        data-component-id={curNodeId}
        onClick={(e) => e.stopPropagation()}
        className={`${style.root?.className || ""} pointer-events-auto bg-white shadow-2xl`}
        style={nodeStyleObj.root}
      >
        {/* [Body] 자식 노드들(버튼, 이미지, 텍스트)이 여기에 렌더링 됨 */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
