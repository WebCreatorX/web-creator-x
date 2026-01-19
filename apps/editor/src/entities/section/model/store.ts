import { create } from 'zustand';

export const useSectionStore = create((set) => ({
  sections: [
    { id: 's1', name: '히어로 섹션' },
    { id: 's2', name: '특징 소개' },
    { id: 's3', name: '푸터' },
  ],
  selectSection: (id: string) => console.log(`Section ${id} 선택됨`),
}));
