interface StaticItem {
  id: string;
  label: string;
}

export const StaticContent = ({ items, onItemClick }: { items: StaticItem[], onItemClick: (item: StaticItem) => void }) => (
  <div className="p-3 space-y-1">
    {items.map((item) => (
      <button
        key={item.id}
        onClick={() => onItemClick(item)}
        className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all text-sm text-zinc-600"
      >
        {item.label}
      </button>
    ))}
  </div>
);