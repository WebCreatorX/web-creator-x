// 왜 쓰는지 나중에 알아보자
import { useCallback } from 'react';
// 서버 <-> 사이드바 통신 훅
import { useCreateComponentRecord } from '@/entities/component/model/useCreateComponentRecord';
// 컴포넌트 기본값 훅
import { useComponentDefaults } from '@/entities/component/model/useComponentDefaults';
// 에디터 전역상태 훅
import { useAddNode } from '@/stores/useEditorStore';
import type { WcxNode } from '@repo/ui/types/nodes';

interface CreateComponentParams {
  pageId: string | number;
  type: WcxNode['type'];
  parentId?: string | null;      // 기본값: null (최상위)
}

export function useCreateCanvasNode() {
  const { createRecord } = useCreateComponentRecord();
  const { getDefaults } = useComponentDefaults();
  const addNode = useAddNode();

  const createNode = useCallback(async (
    params: CreateComponentParams
  ): Promise<WcxNode> => {
    const { pageId, type, parentId = null } = params;

    // Step 1: position 계산
    // 질문:포지션이 뭐지? 일단 root라 생각하고 0 반환하자
    const position = 0;
    // const position = calculateInsertPosition(nodes, parentId, insertAt);

    // Step 2: 서버에 레코드 생성 요청 (최소 데이터만)
    const record = await createRecord({
      page_id: pageId,
      parent_id: parentId,
      position,
      type,
    });

    // Step 3: 타입별 기본값 가져오기
    const defaults = await getDefaults(type);

    // Step 4: 완전한 노드 조합
    const node: WcxNode = {
      // DB에서 생성된 데이터
      id: record.id,
      created_at: record.created_at,

      // 클라이언트에서 전달한 데이터
      page_id: record.page_id,
      parent_id: record.parent_id,
      position: record.position,
      type: record.type,

      // 기본값에서 가져온 데이터
      props: defaults.props,
      style: defaults.style,
      layout: defaults.layout,
    } as WcxNode; // 타입 단언 필요 (type에 따라 props가 달라지므로)

    // Step 5: 캔버스에 추가
    addNode(node);

    return node;
  }, [createRecord, getDefaults, addNode]);

  return {
    createNode,
    // ... 기타 메서드
  };
}