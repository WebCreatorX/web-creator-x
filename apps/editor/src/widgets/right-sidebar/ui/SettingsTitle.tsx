interface SettingsTitleProps {
  type?: string;
}

export default function SettingsTitle({ type }: SettingsTitleProps) {
  const title = type ? `${type.toUpperCase()} SETTINGS` : "NO SELECTION";

  return (
    <h2 className="font-bold text-[14px] leading-none text-zinc-700 font-inter">
      {title}
    </h2>
  );
}
