"use client";

import { useState } from "react";
import NumberInput from "./NumberInput";
import ToggleButtonGroup from "./ToggleButtonGroup";

type PaddingMode = "uniform" | "individual";

interface PaddingInputProps {
  top: number;
  right: number;
  bottom: number;
  left: number;
  onChange: (padding: { top: number; right: number; bottom: number; left: number }) => void;
}

export default function PaddingInput({
  top,
  right,
  bottom,
  left,
  onChange,
}: PaddingInputProps) {
  const [mode, setMode] = useState<PaddingMode>(
    top === right && right === bottom && bottom === left ? "uniform" : "individual"
  );

  const handleUniformChange = (value: number) => {
    onChange({ top: value, right: value, bottom: value, left: value });
  };

  const handleIndividualChange = (key: "top" | "right" | "bottom" | "left", value: number) => {
    onChange({ top, right, bottom, left, [key]: value });
  };

  return (
    <div className="flex flex-col gap-2 w-[140px]">
      <div className="flex items-center gap-[10px] h-[26px]">
        <NumberInput
          value={top}
          onChange={handleUniformChange}
          size="small"
          disabled={mode === "individual"}
          blurred={mode === "individual"}
        />
        <ToggleButtonGroup
          size="small"
          value={mode}
          onChange={(val) => setMode(val as PaddingMode)}
          options={[
            { label: "U", value: "uniform" },
            { label: "I", value: "individual" },
          ]}
        />
      </div>

      {mode === "individual" && (
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            {(["top", "right", "bottom", "left"] as const).map((key) => (
              <div key={key} className="flex-1 min-w-0 flex flex-col items-center gap-1">
                <input
                  type="number"
                  value={{ top, right, bottom, left }[key]}
                  onChange={(e) => handleIndividualChange(key, Number(e.target.value))}
                  className="w-full h-[26px] text-center bg-[#F4F4F5] rounded-[4px] text-[10px] font-medium outline-none border-none focus:ring-1 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[9px] text-zinc-400 font-bold uppercase">{key[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
