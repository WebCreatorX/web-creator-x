"use client";

import { useSetNode } from "@/stores/useEditorStore";
import { useEffect, useRef } from "react";
import { WcxNode } from "types";

interface EditorStoreInitializer {
  children: React.ReactNode;
  initialNodes: WcxNode[];
}

//TODO-일단 DB와 연동하지 말자. 서버액션의 사용이유는 초기 렌더링 속도 향상임. 이후에는 클라이언트에서 스토어 업데이트를 할 예정.
export default function EditorStoreInitializer({
  children,
  initialNodes,
}: EditorStoreInitializer) {
  const initialized = useRef(false);
  const setNode = useSetNode();
  useEffect(() => {
    if (initialized.current) return;
    setNode(initialNodes);
    initialized.current = true;
  }, [initialNodes, setNode]);

  return <>{children}</>;
}
