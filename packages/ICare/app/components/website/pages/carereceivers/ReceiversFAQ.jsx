import React from "react";
import Accordion from "../../../../components/website/common/accordian/accordian";
import styles from "./receivers-faq.module.scss";

export default function ReceiversFAQ() {
  const faqs = [
    {
      q: "Do I pay anything to register?",
      a: "No. Registering and browsing caregivers is completely free. You only pay a simple 10% service fee when you book care."
    },
    {
      q: "How do I verify a caregiver?",
      a: "Profiles include experience, checks, skills and availability. You can message privately, schedule a call, and request documents before agreeing terms."
    },
    {
      q: "How does ICare work?",
      a: "You browse verified caregivers, message them directly and choose the person who feels right. Once you agree on support, you confirm the booking and pay securely through ICare."
    }
  ];

  return (
    <section aria-label="FAQ" className={styles.section}>
      <h2 className={styles.title}>Frequently asked questions</h2>
      <Accordion items={faqs} />
    </section>
  );
}
