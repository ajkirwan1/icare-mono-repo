import { IconChip } from "../icon-chip/icon-chip";

export function LegendIcon({ color, bg, label, children }) {
  return (
    <span
      title={label}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <IconChip color={color} bg={bg}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color }}
        >
          {children}
        </svg>
      </IconChip>
      <span style={{ fontSize: 12, color: "#6B7280" }}>{label}</span>
    </span>
  );
}
