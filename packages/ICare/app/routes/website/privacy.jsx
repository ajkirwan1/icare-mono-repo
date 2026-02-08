import React from "react";
import privacySrc from "/images/heros/privacy.webp";
import PrivacyHero from "../../components/website/pages/privacy/privacy-hero";
import PrivacyContent from "../../components/website/pages/privacy/privacy-content";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

export default function PrivacyPage() {

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
            Your privacy matters to us.
            <br />
            This page explains what personal data we collect<br /> why we collect it,
            and how you can exercise your rights.
          </>
        }
        navItems={navItems}
      />
      <PrivacyContent />
      <ICareFooter />
    </>
  );
}
