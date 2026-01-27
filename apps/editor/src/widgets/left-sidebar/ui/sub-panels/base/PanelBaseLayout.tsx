interface PanelBaseLayoutProps {
    title: string;
    description?: string;
    children: React.ReactNode;
  }
  
  export const PanelBaseLayout = ({ title, description, children }: PanelBaseLayoutProps) => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-zinc-100">
        <h2 className="text-sm font-bold text-zinc-900">{title}</h2>
        {description && (
          <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-tight">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );