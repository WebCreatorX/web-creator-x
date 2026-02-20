"use client";

interface TextInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function TextInput({ id, name, value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex w-full h-[33px] items-center px-3 py-2 rounded-[6px] border border-[#E4E4E7] bg-white font-inter font-normal text-[14px] leading-none text-zinc-900 placeholder:text-[#A1A1AA] outline-none focus:border-zinc-400 transition-colors"
    />
  );
}
