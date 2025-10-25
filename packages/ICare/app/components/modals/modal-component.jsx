export default function ModalComponent({ isOpen, onClose, title, children }) {
  if (!isOpen) { return null; }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          position: "relative"
        }}
      >
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <div style={{ marginTop: "12px" }}>{children}</div>
        <div style={{ textAlign: "right", marginTop: "24px" }}>
          <button
            onClick={onClose}
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
