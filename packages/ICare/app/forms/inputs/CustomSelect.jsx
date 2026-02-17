import { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./custom-select.module.scss";

/**
 * CustomSelect (CSS Modules)
 * - button trigger
 * - listbox popup
 * - hidden input for form submit
 *
 * Notes:
 * - list styles are isolated in CustomSelect.module.scss (no :global needed)
 * - avoids applying "control" styles to the <ul> (common layout bug)
 */
export default function CustomSelect({
    name,
    id,
    labelId,
    value,
    onChange,
    options,
    placeholder = "Select",
    disabled = false,
    invalid = false,
    describedBy,
    className,
    controlClassName,
}) {
    const uid = useId();
    const selectId = id ?? `cs_${uid}`;
    const listId = `${selectId}__list`;

    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const btnRef = useRef(null);

    const selected = useMemo(
        () => options.find((o) => o.value === value),
        [options, value]
    );

    // close on outside click / Escape
    useEffect(() => {
        if (!open) return;

        const onDown = (e) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) setOpen(false);
        };

        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                requestAnimationFrame(() => btnRef.current?.focus());
            }
        };

        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const choose = (next) => {
        onChange?.(next);
        setOpen(false);
        requestAnimationFrame(() => btnRef.current?.focus());
    };

    return (
        <div ref={wrapRef} className={clsx(className)} data-open={open ? "1" : "0"}>

            {/* hidden input -> form submit */}
            <input type="hidden" name={name} value={value ?? ""} />

            <button
                ref={btnRef}
                type="button"
                className={clsx(controlClassName, styles.trigger)}
                aria-haspopup="listbox"
                aria-expanded={open ? "true" : "false"}
                aria-controls={listId}
                aria-labelledby={labelId}
                aria-invalid={invalid ? "true" : "false"}
                aria-describedby={describedBy}
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={styles.value}>
                    {selected?.label ?? placeholder}
                </span>

                <span className={styles.chev} aria-hidden="true">
                    ▾
                </span>
            </button>

            {open && (
                <ul
                    id={listId}
                    role="listbox"
                    className={styles.list}
                    aria-labelledby={labelId}
                >
                    {options.map((opt) => {
                        const isActive = opt.value === value;

                        return (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={isActive ? "true" : "false"}
                                className={styles.item}
                            >
                                <button
                                    type="button"
                                    className={clsx(styles.option, isActive && styles.optionActive)}
                                    onClick={() => choose(opt.value)}
                                    disabled={disabled}
                                >
                                    {opt.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
