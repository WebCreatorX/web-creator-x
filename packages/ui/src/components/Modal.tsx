import { useBuilderMode } from "context/builderMode";
import { useRuntimeState } from "context/runtimeContext";
import { useRef } from "react";
import { ModalNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const curNodeId = node.id;

  const { mode } = useBuilderMode();

  //Context를 통한 상태 구독
  //TODO-만약 context의 형태가 context API에서 zustand로 바뀐다면 해당 로직도 수정되야 합니다.
  const { state, updateNodeState } = useRuntimeState();

  const isOpen = state[curNodeId]?.isOpen ?? false;

  const { title, showCloseButton, closeOnOverlayClick } = props;

  const nodeStyleObj = processNodeStyles(style);

  //닫기 핸들러
  function closeHandler(e?: React.MouseEvent) {
    if (mode === "editor") return;

    e?.stopPropagation();

    updateNodeState(curNodeId, { isOpen: false });
  }

  function overlayClickHandler(e?: React.MouseEvent<HTMLDialogElement>) {
    if (props.closeOnOverlayClick === false) return;
    if (e?.target !== dialogRef.current) return;
    //오직 ::backdrop에 이벤트가 발생했을 경우에만 발생합니다.
    closeHandler(e);
  }

  if (!isOpen) return null;

  //굳이 div로 오버레이가 필요 없을듯..? ::backdrop과 dialog에서 제공하는 .showModal() 사용해보기
  // (closeOnOverlayClick 존재 유무에 따라 div태그의 핸들러 동작을 결정하자.)

  //기본적인 모달 태그는 dialog로 결정
  //이때 배경 클릭시
  return (
    <dialog
      ref={dialogRef}
      data-component-id={curNodeId}
      onClick={overlayClickHandler}
    >
      {/* 실제 모달 컨테이너 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${style.root?.className || ""} relative min-h-[200px] min-w-[300px] rounded-lg bg-white shadow-xl`}
        style={nodeStyleObj.root}
      >
        {/* 모달 헤더 */}
        {(props.title || props.showCloseButton) && (
          <div
            className={`${style.heading?.className || ""} flex items-center justify-between p-4`}
            style={nodeStyleObj.heading}
          >
            {props.title && <h3>{props.title}</h3>}

            {/* TODO-svg 공통 모듈 작업 필요 */}
            {props.showCloseButton && <button>X</button>}
          </div>
        )}

        {/* [Body] 자식 노드들(버튼, 이미지, 텍스트)이 여기에 렌더링 됨 */}
        <div className="p-4">{children}</div>
      </div>
    </dialog>
  );
}
