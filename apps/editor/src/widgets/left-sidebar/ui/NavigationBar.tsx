import { cn } from '@repo/utils';
import { useNavigationStore } from '../model/store';
import { NAV_ITEMS } from '../model/constants';

export const NavigationBar = () => {
  const { activeTab, setActiveTab } = useNavigationStore();

  return (
    <nav
      className={cn(
        "w-[60px] h-full bg-white border-r border-zinc-200",
        "flex flex-col items-center py-4 px-2 gap-2"
      )}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              // 아이콘 크기 44x44, 곡률 6px 반영
              "w-11 h-11 flex items-center justify-center rounded-md transition-all duration-200",
              isActive
                ? "bg-[#F4F4F5] text-zinc-900"
                : "text-zinc-500 hover:bg-[#F4F4F5] hover:text-zinc-900"
            )}
            title={item.label}
          >
            <Icon size={24} strokeWidth={1.5} />
          </button>
        );
      })}
    </nav>
  );
};