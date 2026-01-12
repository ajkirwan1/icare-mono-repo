import React from "react";
import { NavLink } from "react-router";
import styles from "./privacy-content.module.scss";

const company = {
  brand: "ICare",
  operator: "Katarzyna Kruk (sole trader)",
  tradingAs: "ICare",
  email: "customershelp@icare.com",
  address: "Cheltenham, Gloucestershire, GL50 1AA, United Kingdom",
  lastUpdated: "January 1, 2026"
};

export default function PrivacyContent() {
  return (
    <section className={styles.page} aria-label="Privacy Policy (duplicate intro)">
      <h1>Privacy Policy</h1>

      <p>
        <br />
        This Privacy Policy explains how <strong>{company.brand}</strong> (“we”, “us”) collects,
        uses and protects personal data when you use our website and MVP marketplace. ICare is an{" "}
        <strong>introductory marketplace</strong> (not a care agency). Families and caregivers
        communicate directly and make arrangements between themselves.
      </p>

      <p>
        Cookies details:{" "}
        <NavLink to="/cookies" className={styles.cookiesLink}>
          Cookies
        </NavLink>
        . Essential cookies may be used to keep the site working securely. We ask for consent for
        non-essential cookies (if enabled).
      </p>

      {/* WHO */}
      <div className={styles.section}>
        <h2>Who we are</h2>
        <div className={styles.intro}>
          <p>
            <strong>{company.brand}</strong> is operated by{" "}
            <strong>{company.operator}</strong> trading as{" "}
            <strong>{company.tradingAs}</strong>. We act as the “controller” for
            personal data we collect through this website and MVP features
            (for example: waitlist, enquiries, profiles, messaging, and support).
          </p>
          <p>
            Families and caregivers are independent parties. If you share personal
            data in messages, calls or agreements, you do so directly with the
            other party and they will handle that data separately.
          </p>
        </div>
      </div>

      {/* DATA */}
      <div className={styles.section}>
        <h2>Personal data we collect</h2>
        <p>
          We collect only what’s needed to run the MVP, respond to requests, and
          keep the service secure.
        </p>
        <ul className={styles.ul}>
          <li>
            <strong>Waitlist / enquiries:</strong> email, postcode (or area),
            care preferences, optional notes.
          </li>
          <li>
            <strong>Accounts & profiles (if enabled):</strong> name and contact
            details, location/availability, and information you choose to share
            (for example: experience, skills, references).
          </li>
          <li>
            <strong>Messages (if enabled):</strong> content you send through the
            platform to enable direct communication.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, device/browser info,
            approximate location (derived from IP), and security logs.
          </li>
        </ul>
        <p>
          Please avoid sharing unnecessary sensitive details in free-text fields.
          Where possible, keep medical information minimal and relevant.
        </p>
      </div>

      {/* USE */}
      <div className={styles.section}>
        <h2>How we use your data</h2>
        <ul className={styles.ul}>
          <li>To record your request and respond to you.</li>
          <li>
            To prioritise and plan the MVP launch by area and care needs
            (for example: Cheltenham first).
          </li>
          <li>
            To provide essential service messages (confirmation, support replies).
          </li>
          <li>To keep the service secure and prevent misuse.</li>
          <li>
            To improve the product (debugging, performance, basic analytics if enabled).
          </li>
        </ul>
      </div>

      {/* EMAILS */}
      <div className={styles.section}>
        <h2>Emails (waitlist and updates)</h2>
        <p>
          We use your email address to: (1) confirm your waitlist request and
          respond to enquiries, (2) send essential MVP service messages (for
          example, availability in your area), and (3) send optional launch updates
          if you opted in.
        </p>
        <p>
          You can unsubscribe from optional updates at any time. If you unsubscribe
          from optional updates, we may still send important service-related emails
          (for example, to confirm your request or respond to you).
        </p>
        <p>
          We may use an email service provider to deliver messages and keep basic
          delivery logs (for example: message delivery status). Providers process
          data on our behalf under a data-processing agreement where required.
        </p>
      </div>

      {/* LEGAL BASIS */}
      <div className={styles.section}>
        <h2>Legal basis (UK GDPR)</h2>
        <p>
          We process personal data under these legal bases (depending on what you do on ICare):
        </p>
        <ul className={styles.ul}>
          <li>
            <strong>Contract / steps before contract:</strong> providing features you request
            (for example: waitlist or enquiries).
          </li>
          <li>
            <strong>Legitimate interests:</strong> security, fraud prevention, customer support,
            and improving the service.
          </li>
          <li>
            <strong>Consent:</strong> where required (for example: optional email updates and
            non-essential cookies).
          </li>
          <li>
            <strong>Legal obligations:</strong> where required by law.
          </li>
        </ul>
      </div>

      {/* SHARING */}
      <div className={styles.section}>
        <h2>Sharing your data</h2>
        <p>
          We do not sell your personal data. We share it only where necessary to operate the MVP:
        </p>
        <ul className={styles.ul}>
          <li>
            <strong>With service providers:</strong> hosting, email delivery, security tools,
            and analytics (if enabled).
          </li>
          <li>
            <strong>For legal reasons:</strong> if required by law, to protect users, or to prevent misuse.
          </li>
        </ul>
        <p>
          If we add payments later, payment providers will process payment data under their own privacy policies.
          We will update this policy before launching payments.
        </p>
      </div>

      {/* RETENTION */}
      <div className={styles.section}>
        <h2>Data retention</h2>
        <p>
          We keep personal data only as long as needed for the MVP service, safety, and legal requirements.
        </p>
        <ul className={styles.ul}>
          <li>
            Waitlist data: until the MVP launch period ends, you unsubscribe, or you request deletion.
          </li>
          <li>
            Support enquiries: as long as needed to respond and resolve issues.
          </li>
          <li>
            Technical logs: kept for security and debugging for a limited period.
          </li>
        </ul>
      </div>

      {/* RIGHTS */}
      <div className={styles.section}>
        <h2>Your rights</h2>
        <p>Under UK GDPR, you may have the right to:</p>
        <ul className={styles.ul}>
          <li>Request access to your data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion (where applicable)</li>
          <li>Object to processing or request restriction</li>
          <li>Request data portability</li>
          <li>Withdraw consent (where processing is based on consent)</li>
        </ul>
      </div>

      {/* SECURITY */}
      <div className={styles.section}>
        <h2>Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect personal data.
          This includes access controls, secure hosting, and monitoring to help prevent unauthorised access.
        </p>
        <p>
          No method of transmission is 100% secure. Please avoid sharing sensitive personal information
          in messages unless it is necessary.
        </p>
      </div>
    </section>
  );
}
