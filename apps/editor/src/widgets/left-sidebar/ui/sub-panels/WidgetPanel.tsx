import { PanelBaseLayout } from './base/PanelBaseLayout';
import { StaticContent } from './base/StaticContent';
import { STATIC_PANEL_DATA } from '../../model/constants';

export const WidgetPanel = () => {
  const { title, description, items } = STATIC_PANEL_DATA.widget;

  return (
    <PanelBaseLayout title={title} description={description}>
      <StaticContent
        items={items}
        onItemClick={(item) => console.log(`${item.id} 위젯 추가`)}
      />
    </PanelBaseLayout>
  );
};