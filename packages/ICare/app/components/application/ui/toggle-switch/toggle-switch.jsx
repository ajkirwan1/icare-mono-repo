// components/ui/ToggleSwitch.jsx
import React from "react";

const SIZE_PRESETS = {
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbOffset: 2 },
  md: { trackWidth: 46, trackHeight: 26, thumbSize: 22, thumbOffset: 2 },
  lg: { trackWidth: 56, trackHeight: 32, thumbSize: 28, thumbOffset: 2 }
};

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  size = "md",
  onColor = "#1FAB1F",
  offColor = "#CBD5E1",
  onBorderColor = "#168316",
  offBorderColor = "#94A3B8",
  className,
  style,
  // Use one of these for a11y: ariaLabel OR ariaLabelledby
  ariaLabel,
  ariaLabelledby,
  ...rest
}) {
  const preset = SIZE_PRESETS[size] ?? SIZE_PRESETS.md;
  const { trackWidth, trackHeight, thumbSize, thumbOffset } = preset;

  const handleToggle = () => {
    if (disabled) { return; }
    onChange?.(!checked);
  };

  const handleKeyDown = (e) => {
    if (disabled) { return; }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const trackStyles = {
    width: trackWidth,
    height: trackHeight,
    borderRadius: 999,
    background: checked ? onColor : offColor,
    border: `1px solid ${checked ? onBorderColor : offBorderColor}`,
    position: "relative",
    transition: "background .15s ease, border-color .15s ease",
    outline: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  const thumbStyles = {
    position: "absolute",
    top: thumbOffset,
    left: checked
      ? trackWidth - thumbSize - thumbOffset
      : thumbOffset,
    width: thumbSize,
    height: thumbSize,
    borderRadius: 999,
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,.06)",
    boxShadow: "0 1px 3px rgba(0,0,0,.15)",
    transition: "left .15s ease"
  };

  return (
    <span
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={className}
      style={trackStyles}
      {...rest}
    >
      <span aria-hidden="true" style={thumbStyles} />
    </span>
  );
}
