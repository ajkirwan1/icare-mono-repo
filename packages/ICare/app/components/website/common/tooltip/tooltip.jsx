import { useEffect, useId, useRef, useState } from "react";
import classes from "./tooltip.module.scss";

export default function Tooltip({ content, children }) {
    const [open, setOpen] = useState(false);
    const id = useId();

    const rootRef = useRef(null);

    const onBlurCapture = (e) => {
        const next = e.relatedTarget;
        if (!rootRef.current) return;
        if (next && rootRef.current.contains(next)) return;
        setOpen(false);
    };

    useEffect(() => {
        if (!open) return;

        const closeOnOutside = (e) => {
            const root = rootRef.current;
            if (!root) return;
            if (!root.contains(e.target)) setOpen(false);
        };

        const closeOnEscape = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        const closeOnScroll = () => {
            setOpen(false);
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        };

        document.addEventListener("mousedown", closeOnOutside);
        document.addEventListener("touchstart", closeOnOutside, { passive: true });
        document.addEventListener("keydown", closeOnEscape);
        window.addEventListener("scroll", closeOnScroll, { passive: true });
        window.addEventListener("wheel", closeOnScroll, { passive: true });
        window.addEventListener("touchmove", closeOnScroll, { passive: true });
        document.addEventListener("scroll", closeOnScroll, true);

        return () => {
            document.removeEventListener("mousedown", closeOnOutside);
            document.removeEventListener("touchstart", closeOnOutside);
            document.removeEventListener("keydown", closeOnEscape);
            window.removeEventListener("scroll", closeOnScroll);
            window.removeEventListener("wheel", closeOnScroll);
            window.removeEventListener("touchmove", closeOnScroll);
            document.removeEventListener("scroll", closeOnScroll, true);
        };
    }, [open]);

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
                <span
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
