import React from "react";
// import { IcareButton } from "react-library";

const buttonStyles = {
  primary: {
    padding: "10px 20px",
    borderRadius: 8,
    background: "#4c7865",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  },
  secondary: {
    padding: "10px 20px",
    borderRadius: 8,
    background: "#f4f8f6",
    color: "#375d4f",
    border: "1px solid #dce7e2",
    cursor: "pointer",
    fontWeight: 600
  }
};

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
            {/* <IcareButton
              variant="secondary"
              onClick={onClose}
              style={{ marginRight: "1rem" }}
              disabled={isSending}
            >
              Cancel
            </IcareButton>
            <IcareButton variant="primary" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </IcareButton> */}
            <button
              type="button"
              onClick={onClose}
              style={{ ...buttonStyles.secondary, marginRight: "1rem" }}
              disabled={isSending}
            >
              Cancel
            </button>
            <button type="submit" style={buttonStyles.primary} disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
