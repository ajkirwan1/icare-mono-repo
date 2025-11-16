import React from "react";
import { ContactCard } from "../cards/contract-card";

export function FifthSection() {
  return (
    <section
      id="contact"
      aria-label="Contact us"
      style={{
        margin: "3.5rem 0 4.5rem",
        padding: "0 clamp(16px,4vw,32px)"
      }}
    >
      <ContactCard />
    </section>
  );
}
