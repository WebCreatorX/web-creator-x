import { create } from 'zustand';
import { NavigationState } from './types';

export const useNavigationStore = create<NavigationState>((set) => ({
  activeTab: 'layer', // 기본값
  isExpanded: true,

  setActiveTab: (tab) => set((state) => ({
    activeTab: tab,
    // 이미 열려있는 탭을 다시 누르면 닫거나, 다른 탭을 누르면 패널 유지
    isExpanded: state.activeTab === tab ? !state.isExpanded : true,
  })),

  closePanel: () => set({ isExpanded: false, activeTab: null }),
}));