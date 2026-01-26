import { PanelBaseLayout } from './base/PanelBaseLayout';
import { StaticContent } from './base/StaticContent';
import { STATIC_PANEL_DATA } from '../../model/constants';

import { useCreateCanvasNode } from '../../../../features/canvas/model/useCreateCanvasNode';

export const ComponentPanel = () => {
  const { title, description, items } = STATIC_PANEL_DATA.component;
  const { createNode } = useCreateCanvasNode();

  const handleComponentClick = (item: { id: string }) => {
    // TODO: 고정된 pageId(201) 대신 실제 활성화된 페이지 상태를 사용하도록 개선 필요
    // TODO: 프로젝트 전역에서 사용할 수 있는 전용 핸들러(Feature)로 이 로직을 추출할지 검토
    createNode({
      pageId: 201,
      type: item.id as any // TODO: STATIC_PANEL_DATA의 타입을 WcxNode['type']과 매핑하여 타입 단언 제거 필요
    });
  };

  return (
    <PanelBaseLayout title={title} description={description}>
      <StaticContent
        items={items as any}
        onItemClick={handleComponentClick}
      />
    </PanelBaseLayout>
  );
};