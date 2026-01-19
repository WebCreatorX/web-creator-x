import { create } from 'zustand';

export const usePageStore = create((set) => ({
  pages: [
    { id: '1', name: '메인 페이지' },
    { id: '2', name: '상품 상세' },
    { id: '3', name: '이벤트' },
  ],
  activePageId: '1',
  selectPage: (id: string) => set({ activePageId: id }),
}));
