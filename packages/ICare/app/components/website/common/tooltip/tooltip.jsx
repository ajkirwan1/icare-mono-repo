import { useId, useRef, useState } from "react";
import classes from "./tooltip.module.scss";

export default function Tooltip({ content, children }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef(null);

  const onBlurCapture = (e) => {
    const next = e.relatedTarget; // where focus is going next
    if (!rootRef.current) { return; }

    // If focus stays inside the tooltip wrapper (e.g. onto a link), don't close
    if (next && rootRef.current.contains(next)) { return; }

    setOpen(false);
  };

  return (
    <span
      ref={rootRef}
      className={classes.wrapper}
      onBlurCapture={onBlurCapture}
    >
      <button
        type="button"
        className={classes.trigger}
        aria-describedby={open ? id : undefined}
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>

      {open && (
        <span id={id} role="tooltip" className={classes.tooltip}>
          {content}
        </span>
      )}
    </span>
  );
}
