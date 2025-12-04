"use Rounter";

import { useRuntimeState } from "context/runtimeContext";
import { useRouter } from "next/router";
import { NodeAction } from "types/nodeAction";

export function useActionHandler(action?: NodeAction) {
  const router = useRouter();
  const { state, updateNodeState } = useRuntimeState();

  function excute() {
    if (!action) return;

    switch (action.type) {
      // Alert 띄우기
      case "alert":
        alert(action.payload || "알림");
        break;

      //TODO-스크롤할때의 액션 옵션도 추후에 입력에 따라서 사용자가 커스텀 할 수 있도록 개션해야합니다.
      case "scroll":
        const element = document.querySelector(
          `[data-component-id=${action.payload}]`,
        );
        element?.scrollIntoView({
          block: "center",
          behavior: "smooth",
          inline: "nearest",
        });

        break;

      //모달 띄우기 (모달 노드의 isOpen 상태를 변경)
      case "modal":
        if (action.targetId) {
          updateNodeState(action.targetId, { isOpen: true });
        }
        break;

      //링크이동
      case "link":
        if (action.payload) router.push(action.payload);
        break;

      //TODO-추후 필요한 기능 추가 예정(API 호출 등등...)
    }
  }

  return excute;
}
