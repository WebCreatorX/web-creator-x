import { create } from 'zustand';

interface Section {
  id: string;
  name: string;
}

interface SectionState {
  sections: Section[];
  selectSection: (id: string) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [
    { id: 's1', name: '히어로 섹션' },
    { id: 's2', name: '특징 소개' },
    { id: 's3', name: '푸터' },
  ],
  selectSection: (id: string) => console.log(`Section ${id} 선택됨`),
}));
