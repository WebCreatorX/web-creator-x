import { PanelBaseLayout } from './base/PanelBaseLayout';
import { DynamicContent } from './base/DynamicContent';
import { useSectionStore } from '@/entities/section';

export const SectionPanel = () => {
  const { sections, selectSection }: any = useSectionStore();

  return (
    <PanelBaseLayout title="섹션" description="페이지 이름">
      <DynamicContent 
        items={sections.map(s => ({ id: s.id, label: s.name }))} 
        onItemClick={selectSection} 
      />
    </PanelBaseLayout>
  );
};