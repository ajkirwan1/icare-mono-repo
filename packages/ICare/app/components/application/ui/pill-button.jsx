import styles from "./pill-button.module.scss";

export function PillButton({
  children,
  className,
  style,          // still allow runtime overrides if you want
  type = "button",
  ...buttonProps
}) {
  const mergedClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return (
    <button
      type={type}
      className={mergedClassName}
      style={style}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
