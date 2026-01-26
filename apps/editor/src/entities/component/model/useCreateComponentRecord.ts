// DB에 컴포넌트 레코드 생성하도록 서버에 요청하는 훅
// pageId, type, parentId, position 등 컴포넌트 레코드 생성에 필요한 데이터를 전달 후 DB에 저장된 레코드 id, created_at이 추가된 응답값을 받음
// 질문: parentId는 필요한가? 왜냐하면 컴포넌트가 추가될 때는 항상 페이지의 root에 추가되는 것이므로 parentId는 필요하지 않을 것 같음
// 이전에 root에 추가하도록 milo와 얘기나눴음
import { useState } from 'react';
// 일단 componentApi는 mock 응답으로 구현됨
import { componentApi } from '@/shared/api/components';
import type { ComponentRecordRequest, ComponentRecordResponse } from '@/shared/types/component';

interface UseCreateComponentRecordReturn {
  createRecord: (data: ComponentRecordRequest) => Promise<ComponentRecordResponse>;
  isLoading: boolean;
  error: Error | null;
}

export function useCreateComponentRecord(): UseCreateComponentRecordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createRecord = async (data: ComponentRecordRequest): Promise<ComponentRecordResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await componentApi.createRecord(data);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createRecord,
    isLoading,
    error,
  };
}