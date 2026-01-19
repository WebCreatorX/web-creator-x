import { useNavigationStore } from '../model/store';
import { 
  ComponentPanel, 
  PagePanel, 
  SectionPanel, 
  WidgetPanel, 
  ModalPanel 
} from './sub-panels';

export const SubPanel = () => {
  const { activeTab, isExpanded } = useNavigationStore();

  if (!isExpanded || !activeTab) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'component': return <ComponentPanel />;
      case 'page':      return <PagePanel />;
      case 'section':   return <SectionPanel />;
      case 'widget':    return <WidgetPanel />;
      case 'modal':     return <ModalPanel />;
      default:          return null;
    }
  };

  return (
    <aside className="w-[260px] h-full bg-white border-r border-zinc-200 flex flex-col shadow-sm">
      {renderContent()}
    </aside>
  );
};