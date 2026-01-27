import { ComponentRecordRequest, ComponentRecordResponse } from '../types/component';

export const componentApi = {
  /**
   * 서버 통신을 흉내내는 모크 API입니다.
   * 클라이언트 측에서 새로운 컴포넌트 레코드 데이터를 생성하여 반환합니다.
   */
  createRecord: async (data: ComponentRecordRequest): Promise<ComponentRecordResponse> => {
    // 실제 서버 통신 대기 시간을 시뮬레이션하기 위한 지연 시간 (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      ...data,
      // 임시 ID 생성 (UUID 형식)
      id: crypto.randomUUID(),
      // 생성 시간 생성
      created_at: new Date().toISOString(),
    };
  },
};
