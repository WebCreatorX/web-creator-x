import { PanelBaseLayout } from './base/PanelBaseLayout';
import { StaticContent } from './base/StaticContent';
import { STATIC_PANEL_DATA } from '../../model/constants';

export const ComponentPanel = () => {
  const { title, description, items } = STATIC_PANEL_DATA.component;
  
  return (
    <PanelBaseLayout title={title} description={description}>
      <StaticContent 
        items={items} 
        onItemClick={(id) => console.log(`${id} 컴포넌트 추가`)} 
      />
    </PanelBaseLayout>
  );
};