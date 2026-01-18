"use client";

import { useSetNode } from "@/stores/useEditorStore";
import { useEffect } from "react";
import { WcxNode } from "types";

interface EditorStoreInitializer {
  children: React.ReactNode;
  initialNodes: WcxNode[];
}

export default function EditorStoreInitializer({
  children,
  initialNodes,
}: EditorStoreInitializer) {
  const setNode = useSetNode();
  useEffect(() => {
    setNode(initialNodes);
  }, [initialNodes]);

  return <>{children}</>;
}
