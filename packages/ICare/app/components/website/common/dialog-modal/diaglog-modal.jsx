import { useEffect, useRef } from "react";
import modalClasses from "./dialog-modal.module.scss";

/**
 * Reusable <dialog>-based modal.
 *
 * Props:
 * - open: boolean (controls showModal/close)
 * - onClose: function (called when the modal closes via X, Esc, click backdrop)
 * - titleId: string (for aria-labelledby)
 * - children: modal contents
 */
export default function DialogModal({ open, onClose, titleId, children }) {
  const dialogRef = useRef(null);

  // Open/close based on `open`
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) { return; }

    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  // Ensure onClose fires for Esc and programmatic close
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) { return; }

    const handleClose = () => onClose?.();

    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  // Close on backdrop click
  const onBackdropMouseDown = (e) => {
    const el = dialogRef.current;
    if (!el) { return; }

    const rect = el.getBoundingClientRect();
    const clickedInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!clickedInside) { el.close(); }
  };

  return (
    <dialog
      ref={dialogRef}
      className={modalClasses.modal}
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={onBackdropMouseDown}
      onClick={(e) => {
        // only close when the click is on the backdrop itself
        if (e.target === e.currentTarget) { e.currentTarget.close(); }
      }}
    >
      {children}
    </dialog>
  );
}
