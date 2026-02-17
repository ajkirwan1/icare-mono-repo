import { useEffect, useId, useRef, useState } from "react";
import classes from "./tooltip.module.scss";

export default function Tooltip({ content, children }) {
    const [open, setOpen] = useState(false);
    const id = useId();

    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);

    const onBlurCapture = (e) => {
        const next = e.relatedTarget;
        if (!rootRef.current) return;
        if (next && rootRef.current.contains(next)) return;
        setOpen(false);
    };

    // 🔥 Clamp positioning logic
    useEffect(() => {
        if (!open) return;
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipEl = tooltipRef.current;

        const pad = 12;

        // reset styles first
        tooltipEl.style.left = "";
        tooltipEl.style.top = "";
        tooltipEl.style.transform = "";

        const tooltipRect = tooltipEl.getBoundingClientRect();

        // center horizontally relative to trigger
        let left =
            triggerRect.left +
            triggerRect.width / 2 -
            tooltipRect.width / 2;

        // clamp to viewport
        left = Math.max(pad, left);
        left = Math.min(
            window.innerWidth - tooltipRect.width - pad,
            left
        );

        // position above trigger
        const top =
            triggerRect.top -
            tooltipRect.height -
            8;

        tooltipEl.style.position = "fixed";
        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${Math.max(pad, top)}px`;
        tooltipEl.style.maxWidth = "min(92vw, 360px)";
    }, [open]);

    return (
        <span
            ref={rootRef}
            className={classes.wrapper}
            onBlurCapture={onBlurCapture}
        >
            <button
                ref={triggerRef}
                type="button"
                className={classes.trigger}
                aria-describedby={open ? id : undefined}
                aria-expanded={open ? "true" : "false"}
                onClick={() => setOpen((v) => !v)}
            >
                {children}
            </button>

            {open && (
                <span
                    ref={tooltipRef}
                    id={id}
                    role="tooltip"
                    className={classes.tooltip}
                >
                    {content}
                </span>
            )}
        </span>
    );
}
