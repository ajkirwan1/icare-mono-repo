import React from "react";
import privacySrc from "/images/heros/privacy.jpg";
import PrivacyHero from "../../components/website/pages/privacy/privacy-hero";
import PrivacyContent from "../../components/website/pages/privacy/privacy-content";
import ReceiversFooter from "../../components/website/pages/shared/footers/ICareFooter";
import styles from "./privacy-page.module.scss";

export default function PrivacyPage() {
  const COMPANY = {
    brand: "ICare",
    operator: "Katarzyna Kruk (sole trader)",
    tradingAs: "ICare",
    email: "customershelp@icare.com",
    address: "Cheltenham, Gloucestershire, GL50 1AA, United Kingdom",
    lastUpdated: "January 1, 2026"
  };

  const navItems = [
    ["#who", "Who we are"],
    ["#data", "Data we collect"],
    ["#use", "How we use data"],
    ["#emails", "Emails"],
    ["#law", "Legal basis"],
    ["#share", "Sharing"],
    ["#retain", "Retention"],
    ["#rights", "Your rights"],
    ["#contact", "Contact"]
  ];

  return (
    <>
      <PrivacyHero
        backgroundSrc={privacySrc}
        title="Privacy"
        lead={
          <>
            We design ICare with privacy-first principles.
            <br />
            Below you will find what we collect, why, and how to exercise your
            rights.
          </>
        }
        navItems={navItems}
      />

      <PrivacyContent company={COMPANY} styles={styles} />
      <ReceiversFooter />
    </>
  );
}
