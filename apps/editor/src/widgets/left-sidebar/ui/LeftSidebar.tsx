import { NavigationBar } from './NavigationBar';
import { SubPanel } from './SubPanel';          
import { useNavigationStore } from '../model/store';

export const LeftSidebar = () => {
  const { activeTab } = useNavigationStore();

  return (
    <div className="flex h-full border-r border-zinc-200">
      <NavigationBar /> 
      {activeTab && <SubPanel />}
    </div>
  );
};