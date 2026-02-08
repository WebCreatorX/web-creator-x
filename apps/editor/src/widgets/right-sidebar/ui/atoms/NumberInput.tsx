"use client";

interface NumberInputProps {
  id?: string;
  name?: string;
  value: number;
  onChange: (val: number) => void;
}

export default function NumberInput({ id, name, value, onChange }: NumberInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex w-full h-[33px] items-center px-3 py-2 rounded-[6px] border border-[#E4E4E7] bg-white font-inter font-normal text-[14px] leading-none text-zinc-900 outline-none focus:border-zinc-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
}
