// ...existing code...
import React from "react";
import styles from "../../styles/components/pill.module.scss";

export default function PillComponent({
  children,
  className = "",
  style,
  ...rest
}) {
  return (
    <div
      className={`${styles.pill} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
// ...existing code...
