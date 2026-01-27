import { create } from 'zustand';

interface Page {
  id: string;
  name: string;
}

interface PageState {
  pages: Page[];
  activePageId: string;
  selectPage: (id: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
  pages: [
    { id: '1', name: '메인 페이지' },
    { id: '2', name: '상품 상세' },
    { id: '3', name: '이벤트' },
  ],
  activePageId: '1',
  selectPage: (id: string) => set({ activePageId: id }),
}));
