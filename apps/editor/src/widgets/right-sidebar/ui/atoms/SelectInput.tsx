"use client";

interface SelectInputProps {
  id?: string;
  name?: string;
  value: string;
  options: { label: string; value: string; disabled?: boolean }[];
  onChange: (val: string) => void;
  size?: "single" | "small";
}

export default function SelectInput({
  id,
  name,
  value,
  options,
  onChange,
  size = "single",
}: SelectInputProps) {
  const widthClass = size === "small" ? "w-[65px]" : "w-[140px]";

  return (
    <div className={`relative ${widthClass} bg-[#F4F4F5] rounded-[8px]`}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex w-full h-[28px] appearance-none items-center px-2 py-0 bg-transparent border-transparent font-inter font-normal text-[13px] leading-none text-zinc-900 outline-none focus:border-zinc-400 transition-colors cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* 커스텀 화살표 아이콘 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-zinc-500">
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}


