interface DynamicItem {
    id: string;
    label: string;
  }
  
  export const DynamicContent = ({ items, onItemClick }: { items: DynamicItem[], onItemClick: (id: string) => void }) => (
    <div className="p-3 space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className="w-full text-left p-3 rounded-lg border border-zinc-200 hover:border-zinc-900 transition-colors text-sm text-zinc-700"
        >
          {item.label}
        </button>
      ))}
    </div>
  );