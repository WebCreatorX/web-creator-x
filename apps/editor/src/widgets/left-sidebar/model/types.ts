export type NavTabId = 'layer' | 'component' | 'page' | 'section' | 'widget' | 'modal';

export interface NavigationState {
  activeTab: NavTabId | null;
  isExpanded: boolean;
  setActiveTab: (tab: NavTabId) => void;
  closePanel: () => void;
}