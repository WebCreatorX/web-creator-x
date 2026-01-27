import {
  Layers,
  File,
  PanelsTopLeft,
  PlusCircle,
  AppWindow
} from 'lucide-react';

export const STATIC_PANEL_DATA = {
  component: {
    title: "컴포넌트",
    description: "기본",
    items: [
      { id: 'Text', label: '텍스트' },
      { id: 'Image', label: '이미지' },
      { id: 'Heading', label: '제목' },
      { id: 'Button', label: '버튼' },
      { id: 'Hero', label: '히어로' },
      { id: 'Modal', label: '모달' },
      { id: 'Container', label: '컨테이너' },
    ]
  },
  widget: {
    title: "위젯",
    description: "기본",
    items: [
      { id: 'header', label: '헤더' },
      { id: 'footer', label: '푸터' },
      { id: 'sidebar', label: '사이드바' },
    ]
  }
};

export const NAV_ITEMS = [
  { id: 'component', label: '컴포넌트', icon: Layers },
  { id: 'page', label: '페이지', icon: File },
  { id: 'section', label: '섹션', icon: PanelsTopLeft },
  { id: 'widget', label: '위젯', icon: PlusCircle },
  { id: 'modal', label: '모달', icon: AppWindow },
] as const;