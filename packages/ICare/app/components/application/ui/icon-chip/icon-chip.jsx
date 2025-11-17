// components/application/ui/icon-chip/icon-chip.jsx
export function IconChip({ color = "#1F2937", bg = "rgba(31,41,55,.12)", children }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 28,
        height: 28,
        display: "grid",
        placeItems: "center",
        borderRadius: 999,
        background: bg,
        color,
        border: `1px solid ${color}20` // 12% opacity
      }}
    >
      {children}
    </span>
  );
}
