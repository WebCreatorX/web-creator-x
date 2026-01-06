"use client";

interface SelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (newValue: string) => void;
}

export default function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: "white"
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}