import React from "react";
import { IcareButton } from "react-library";

export default function ComposeMessageModal({
  isOpen,
  value,
  onChange,
  onClose,
  onSubmit,
  isSending
}) {
  if (!isOpen) { return null; }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compose-message-title"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "320px",
          maxWidth: "560px",
          width: "90%"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="compose-message-title" style={{ marginTop: 0 }}>Send Message</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <textarea
            rows={5}
            style={{ width: "100%", resize: "vertical" }}
            placeholder="Type your message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isSending}
          />
          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <IcareButton
              variant="secondary"
              onClick={onClose}
              style={{ marginRight: "1rem" }}
              disabled={isSending}
            >
              Cancel
            </IcareButton>
            <IcareButton variant="primary" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </IcareButton>
          </div>
        </form>
      </div>
    </div>
  );
}
