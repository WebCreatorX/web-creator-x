"use client";

interface NumberInputProps {
  id?: string;
  name?: string;
  value: number;
  onChange: (val: number) => void;
  size?: "single" | "small";
  suffix?: string;
  disabled?: boolean;
  blurred?: boolean;
}

export default function NumberInput({
  id,
  name,
  value,
  onChange,
  size = "single",
  suffix,
  disabled,
  blurred,
}: NumberInputProps) {
  const widthClass = size === "small" ? "w-[65px]" : "w-[140px]";

  return (
    <div className={`relative ${widthClass} ${blurred ? "opacity-40 cursor-not-allowed" : ""}`}>
      <input
        id={id}
        name={name}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled || blurred}
        className={`flex w-full h-[28px] items-center pl-3 ${suffix ? "pr-8" : "pr-3"} py-0 rounded-[8px] border-transparent bg-[#F4F4F5] font-inter font-normal text-[13px] leading-none text-zinc-900 outline-none focus:border-zinc-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${blurred ? "pointer-events-none" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-400 pointer-events-none font-medium">
          {suffix}
        </span>
      )}
    </div>
  );
}
