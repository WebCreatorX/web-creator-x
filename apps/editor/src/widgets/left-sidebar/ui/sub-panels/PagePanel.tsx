import { PanelBaseLayout } from './base/PanelBaseLayout';
import { DynamicContent } from './base/DynamicContent';
import { usePageStore } from '@/entities/page'; // 예시 엔티티 참조

export const PagePanel = () => {
  const { pages, activePageId, selectPage } = usePageStore();

  return (
    <PanelBaseLayout title="페이지" description="목록">
      <DynamicContent
        items={pages.map(p => ({ id: p.id, label: p.name, isActive: p.id === activePageId }))}
        onItemClick={(item) => selectPage(item.id)}
      />
    </PanelBaseLayout>
  );
};