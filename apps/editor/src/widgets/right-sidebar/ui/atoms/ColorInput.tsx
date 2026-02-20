"use client";

interface ColorInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (val: string) => void;
}

export default function ColorInput({ id, name, value, onChange }: ColorInputProps) {
  return (
    <div className="flex w-full items-center gap-2 rounded-[6px] border border-[#E4E4E7] bg-white px-2 py-1 focus-within:border-zinc-400 transition-colors">
      {/* Color Swatch / Picker Trigger */}
      <div className="relative">
        <input
          id={id ? `${id}-picker` : undefined}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div
          className="w-6 h-6 rounded-[4px] border border-black/10"
          style={{ backgroundColor: value }}
        />
      </div>

      {/* Hex Text */}
      <span className="text-[#A1A1AA] text-xs font-inter select-none">#</span>
      <input
        id={id}
        name={name}
        type="text"
        value={value.replace("#", "").toUpperCase()}
        onChange={(e) => {
          const hex = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
          if (hex.length <= 6) {
            onChange(`#${hex}`);
          }
        }}
        className="w-full bg-transparent font-inter font-normal text-[14px] leading-none text-zinc-900 outline-none uppercase"
        maxLength={6}
      />
    </div>
  );
}
