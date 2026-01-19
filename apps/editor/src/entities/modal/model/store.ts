import { create } from 'zustand';

export const useModalStore = create((set) => ({
    modals: [
      { id: 'm1', name: '로그인 팝업' },
      { id: 'm2', name: '공지사항' },
    ],
    activeModalId: null,
    selectModal: (id: string) => set({ activeModalId: id }),
    createModal: () => alert('새 모달 생성 모드 진입'),
  }));