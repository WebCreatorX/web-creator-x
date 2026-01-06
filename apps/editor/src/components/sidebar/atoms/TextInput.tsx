"use client";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export default function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
    </div>
  );
}