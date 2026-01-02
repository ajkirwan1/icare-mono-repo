import React, { useState } from "react";

export default function ICareWaitlistForm() {
  const [status, setStatus] = useState("idle");

  const [careFor, setCareFor] = useState("Parent");
  const [careType, setCareType] = useState("Hourly");
  const [startWhen, setStartWhen] = useState("ASAP");
  const [hoursWeek, setHoursWeek] = useState("20–40");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [notes, setNotes] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("ok");
  };
  const COLORS = {
    TEXT: "#0F172A",
    MUTED: "rgba(15,23,42,0.72)",
    SOFT: "rgba(15,23,42,0.06)",
    BG: "#F7F7F2",
    ACCENT: "#b97a57",
    BTN: "#b97a57" // ✅ requested
  };

  const note = {
    marginTop: "18px",
    fontSize: "0.78rem",
    color: "rgba(15,23,42,0.62)",
    lineHeight: 1.35,
    fontWeight: 650,
    textAlign: "center"
  };


  const btn = {
    width: "70%",
    padding: "12px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.22)",
    background: COLORS.BTN,
    color: "#fff",
    fontWeight: 950,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(15,23,42,0.16)"
  };

  const btnWrap = {
    display: "flex",
    justifyContent: "center",
    marginTop: 12
  };



  const label = {
    display: "grid",
    gap: 6
  };

  const formGrid = {
    marginTop: "12px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  };

  const control = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: "12px",
    border: "1px solid rgba(15,23,42,0.12)",
    background: "#fff",
    outline: "none",
    fontSize: "0.95rem",
    color: COLORS.TEXT
  };

  const wide = { gridColumn: "1 / -1" };


  const pillRow = {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  };

  const pill = (active) => ({
    padding: "8px 10px",
    borderRadius: 999,
    border: `1px solid ${active ? "rgba(31,171,31,0.35)" : "rgba(15,23,42,0.12)"
      }`,
    background: active ? "rgba(31,171,31,0.10)" : "rgba(255,255,255,0.85)",
    color: COLORS.TEXT,
    fontWeight: 900,
    fontSize: ".84rem",
    cursor: "pointer",
    userSelect: "none"
  });

  const labelText = {
    fontWeight: 900,
    fontSize: ".86rem",
    color: COLORS.TEXT
  };

  return (
    <form onSubmit={onSubmit}>
      {/* BASIC QUESTIONS */}
      <div style={{ marginTop: 2 }}>
        <div style={{ ...labelText, marginBottom: 6 }}>
          Who is the care for?
        </div>

        <div style={pillRow}>
          {["Parent", "Grandparent", "Myself", "Other"].map((v) => (
            <div
              key={v}
              role="button"
              tabIndex={0}
              onClick={() => setCareFor(v)}
              onKeyDown={(e) => e.key === "Enter" && setCareFor(v)}
              style={pill(careFor === v)}
            >
              {v}
            </div>
          ))}
        </div>

        <div style={{ ...labelText, marginTop: 12, marginBottom: 6 }}>
          Care type
        </div>

        <div style={pillRow}>
          {["Hourly", "Live-in", "Both"].map((v) => (
            <div
              key={v}
              role="button"
              tabIndex={0}
              onClick={() => setCareType(v)}
              onKeyDown={(e) => e.key === "Enter" && setCareType(v)}
              style={pill(careType === v)}
            >
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT + QUICK DETAILS */}
      <div className="icare-form-grid" style={formGrid}>
        <label style={label}>
          <span style={labelText}>Email</span>
          <input
            className="icare-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={control}
          />
        </label>

        <label style={label}>
          <span style={labelText}>Postcode</span>
          <input
            className="icare-input"
            required
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            style={control}
          />
        </label>

        <label style={{ ...label, ...wide }}>
          <span style={labelText}>When do you need care?</span>
          <select
            value={startWhen}
            onChange={(e) => setStartWhen(e.target.value)}
            style={control}
          >
            <option>ASAP</option>
            <option>In 2–4 weeks</option>
            <option>Next month</option>
            <option>Just researching</option>
          </select>
        </label>

        <label style={{ ...label, ...wide }}>
          <span style={labelText}>Hours per week (estimate)</span>
          <select
            value={hoursWeek}
            onChange={(e) => setHoursWeek(e.target.value)}
            style={control}
          >
            <option>Less than 10</option>
            <option>10–20</option>
            <option>20–40</option>
            <option>40+</option>
            <option>Not sure yet</option>
          </select>
        </label>

        <label style={{ ...label, ...wide }}>
          <span style={labelText}>Anything important to know?</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ ...control, resize: "vertical", minHeight: 92 }}
          />
        </label>
      </div>

      <div style={btnWrap}>
        <button className="icare-btn" style={btn}>
          {status === "ok" ? "You're on the list ✓" : "Join the early access list"}
        </button>
      </div>

      <div style={note}>
        We’ll send one launch email and occasional updates. Unsubscribe anytime.
      </div>
    </form>
  );
}
