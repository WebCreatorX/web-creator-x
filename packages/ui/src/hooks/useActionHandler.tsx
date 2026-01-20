"use client";

import { useRuntimeState } from "context/runtimeContext";
import { useRouter } from "next/navigation";

import { NodeAction } from "types/nodeAction";

export function useActionHandler(action?: NodeAction) {
  //FIXME-추후에 useRouter훅을 주입받아서 사용해야할까? (@repo/ui가 앱라우터로 빌드되는게 올바른가? 리액트로만 만들어도 될것같은 생각.)
  const router = useRouter();
  const { openModal } = useRuntimeState();

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
          openModal(action.targetId);
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
