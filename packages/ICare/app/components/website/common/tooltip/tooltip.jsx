import { useLayoutEffect, useId, useRef, useState } from "react";
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

    useLayoutEffect(() => {
        if (!open) return;
        if (!triggerRef.current || !tooltipRef.current) return;

        const tooltipEl = tooltipRef.current;
        const pad = 12;
        const positionTooltip = () => {
            if (!triggerRef.current || !tooltipRef.current) return;
            const triggerRect = triggerRef.current.getBoundingClientRect();

            // Set final sizing first so measurements are stable on every open.
            tooltipEl.style.position = "fixed";
            tooltipEl.style.maxWidth = "min(92vw, 360px)";
            tooltipEl.style.left = "0px";
            tooltipEl.style.top = "0px";
            tooltipEl.style.transform = "none";
            tooltipEl.style.visibility = "hidden";

            const tooltipRect = tooltipEl.getBoundingClientRect();

            let left =
                triggerRect.left +
                triggerRect.width / 2 -
                tooltipRect.width / 2 -
                5;
            left = Math.max(pad, left);
            left = Math.min(window.innerWidth - tooltipRect.width - pad, left);

            const top = triggerRect.top - tooltipRect.height - 1.5;

            tooltipEl.style.left = `${left}px`;
            tooltipEl.style.top = `${Math.max(pad, top)}px`;
            tooltipEl.style.visibility = "visible";
        };

        positionTooltip();
        const rafId = window.requestAnimationFrame(positionTooltip);
        window.addEventListener("resize", positionTooltip);
        window.addEventListener("scroll", positionTooltip, true);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("resize", positionTooltip);
            window.removeEventListener("scroll", positionTooltip, true);
        };
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
