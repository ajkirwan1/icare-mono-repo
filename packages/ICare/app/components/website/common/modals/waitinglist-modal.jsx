import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import DialogModal from "../dialog-modal/diaglog-modal";
import classes from "./waitinglist-modal.module.scss";
import SubmitButton from "../buttons/submit-buttons/submit-button";

export default function WaitinglistSuccessModal({
  open,
  onClose,
  email
}) {
  const fetcher = useFetcher();
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const submitting = fetcher.state === "submitting";
  const success = fetcher.data?.ok;

  const onPrimary = () => {
    if (!subscribeNewsletter || !email) {
      onClose?.();
      return;
    }

    // This calls your existing router action
    fetcher.submit(
      { email },
      { method: "post", action: "/newsletter/subscribe" }
    );
  };

  // Auto-close modal when subscription succeeds
  useEffect(() => {
    if (success) {
      onClose?.();
    }
  }, [success, onClose]);

  const titleId = "waitinglist-success-title";

  return (
    <DialogModal open={open} onClose={onClose} titleId={titleId}>
      <div className={classes.modalInner}>
        <button
          type="button"
          className={classes.modalCloseIcon}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className={classes.modalHeader}>
          <div className={classes.modalBadge} aria-hidden="true">
            ✓
          </div>

          <h2 id={titleId} className={classes.modalTitle}>
            You're on the waiting list!
          </h2>

          <p className={classes.modalText}>
            Thanks for joining ICare. We’ll notify you when we launch in your area.
          </p>
        </div>

        <div className={classes.modalPanel}>
          <label className={classes.modalCheckboxLabel}>
            <input
              type="checkbox"
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
              className={classes.checkboxInput}
            />
            <span className={classes.modalCheckboxText}>
              Also subscribe me to the ICare newsletter
            </span>
          </label>

          <p className={classes.modalFinePrint}>
            Monthly updates on care, research, and platform progress. Unsubscribe anytime.
          </p>
        </div>

        {/* Only show action button if they opt in */}
        {subscribeNewsletter && (
          <div className={classes.modalActions}>
            <SubmitButton
              type="button"
              disabled={submitting}
              onClick={onPrimary}
            >
              {submitting ? "Subscribing…" : "Subscribe"}
            </SubmitButton>
          </div>
        )}
      </div>
    </DialogModal>
  );
}
