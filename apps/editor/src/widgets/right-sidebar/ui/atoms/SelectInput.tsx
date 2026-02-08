"use client";

interface SelectInputProps {
  id?: string;
  name?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

export default function SelectInput({ id, name, value, options, onChange }: SelectInputProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex w-full h-[33px] appearance-none items-center px-3 py-2 rounded-[6px] border border-[#E4E4E7] bg-white font-inter font-normal text-[14px] leading-none text-zinc-900 outline-none focus:border-zinc-400 transition-colors cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* 커스텀 화살표 아이콘 (간단한 구현) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
