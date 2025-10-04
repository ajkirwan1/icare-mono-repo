
import React from "react";
import { IcareCard } from "react-library";

export default function MessageComponent({ msg, imgSrc, name }) {

  return (
    <>
      {msg.from === "carerecipient" ? (
        <IcareCard variant="elevated" style={{ backgroundColor: "#d9ece5", marginBottom: "3vh" }}>
          <span slot="contents" style={{ display: "flex", alignItems: "center", gap: "5vw" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: "0 0 auto", alignItems: "center", gap: "1vh" }}>
              <img src={`/${imgSrc}`} alt={`${msg.from} Avatar`} style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                display: "inline-block",
                background: "#f2f2f2"
              }} />
              <span>You</span>
            </div>
            <hr style={{ height: "50px", borderLeft: "1px solid gray", margin: 0 }} />
            <div>
              <strong>{msg.from}:</strong> {msg.content} <em>({new Date(msg.timestamp).toLocaleString()})</em>
              <p>{msg.text}</p>
            </div>
          </span>
        </IcareCard>) : (<IcareCard variant="elevated" style={{ marginBottom: "3vh" }}>
          <span slot="contents" style={{ display: "flex", alignItems: "center", gap: "5vw" }}>
            <div>
              <strong>{msg.from}:</strong> {msg.content}<em>({new Date(msg.timestamp).toLocaleString()})</em>
              <p>{msg.text}</p>
            </div>
            <hr style={{ height: "50px", borderLeft: "1px solid gray", margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", flex: "0 0 auto", alignItems: "center", gap: "1vh" }}>
              <img src={`/${imgSrc}`} alt={`${msg.from} Avatar`} style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                display: "inline-block",
                background: "#f2f2f2"
              }} />
              <span>You</span>
            </div>
          </span>
        </IcareCard>)
      }
    </>
  );
}
