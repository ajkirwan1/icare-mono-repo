import React from "react";
import { Link } from "react-router";

export default function PrivacyContent({ company, styles }) {
  return (
    <main className={styles.pageWrap} aria-label="Privacy Policy content">
      <div className={styles.container}>
        <section className={styles.panel}>
          <div className={styles.mt4}>
            <p className={styles.p}>
              Welcome to ICare.
              <br />
              This Privacy Policy explains how <strong>{company.brand}</strong>{" "}
              (“we”, “us”) collects, uses and protects personal data when you use
              our website and MVP marketplace. ICare is an{" "}
              <strong>introductory marketplace</strong> (not a care agency).
              Families and caregivers communicate directly and make arrangements
              between themselves.
            </p>

            <p className={styles.small}>
              Cookies details:{" "}
              <Link to="/cookies" className={styles.link}>
                Cookies
              </Link>
              .
            </p>
          </div>

          {/* WHO */}
          <div className={styles.section} id="who">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>1) Who we are</h2>
            <p className={styles.p}>
              <strong>{company.brand}</strong> is operated by{" "}
              <strong>{company.operator}</strong> trading as{" "}
              <strong>{company.tradingAs}</strong>. We act as the “controller” for
              personal data we collect through this website and MVP features
              (e.g., waitlist, profiles, messaging, and enquiries).
            </p>
            <p className={styles.small}>
              Families and caregivers are independent parties. Where you share
              personal data in messages or agreements, you do so directly with
              the other party.
            </p>
          </div>

          {/* DATA */}
          <div className={styles.section} id="data">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>2) Personal data we collect</h2>
            <p className={styles.p}>
              We collect only what’s needed to run the MVP and keep the service
              secure.
            </p>

            <ul className={styles.ul}>
              <li>
                <strong>Waitlist / enquiries:</strong> email, postcode, care
                preferences, optional notes.
              </li>
              <li>
                <strong>Accounts & profiles (if enabled):</strong> name, contact
                details, location/availability, and information you choose to
                share.
              </li>
              <li>
                <strong>Messages (if enabled):</strong> content you send through
                the platform to enable direct communication.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, device/browser
                info, approximate location, and logs for security.
              </li>
            </ul>

            <p className={styles.small}>
              Please avoid sharing unnecessary sensitive details in free-text
              fields.
            </p>
          </div>

          {/* USE */}
          <div className={styles.section} id="use">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>3) How we use your data</h2>
            <ul className={styles.ul}>
              <li>To record your request and respond to you.</li>
              <li>
                To prioritise the MVP launch by area and care needs (e.g.,
                Cheltenham first).
              </li>
              <li>
                To provide essential service messages (confirmation, support
                replies).
              </li>
              <li>To keep the service secure and prevent misuse.</li>
              <li>
                To improve the product (debugging, performance, basic analytics
                if enabled).
              </li>
            </ul>
          </div>

          {/* EMAILS */}
          <div className={styles.section} id="emails">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>4) Emails (waitlist and updates)</h2>

            <p className={styles.p}>
              We use your email address to: (1) confirm your waiting list request
              and respond to enquiries, (2) send essential MVP service messages
              (for example, launch availability in your area), and (3) send
              optional launch updates if you opted in.
            </p>

            <p className={styles.p}>
              You can unsubscribe at any time. If you unsubscribe from optional
              updates, we may still send important service-related emails (for
              example, to confirm your request or respond to you).
            </p>

            <p className={styles.small}>
              We may use an email service provider to deliver messages (for
              example, Gmail or an email marketing platform). These providers
              process data on our behalf to send emails and keep basic delivery
              logs.
            </p>

            <div
              className={styles.noteBox}
              aria-label="Copy-paste text for forms and email footer"
            >
              <div className={styles.noteTitle}>Copy-paste (MVP)</div>

              <div className={styles.noteLabel}>Form checkbox label (optional)</div>
              <p className={styles.codeLine}>
                [ ] I’d like to receive early access and launch updates from ICare
                (email).
              </p>

              <div className={styles.spacer16} />

              <div className={styles.noteLabel}>Form note (under the button)</div>
              <p className={styles.codeLine}>
                By joining the waiting list, you agree that we may email you about
                your request and the MVP launch in your area. You can unsubscribe
                at any time.
              </p>

              <div className={styles.spacer16} />

              <div className={styles.noteLabel}>Email footer (add to every email)</div>
              <p className={styles.codeLine}>
                ICare is an agency-free marketplace. You’re receiving this email
                because you joined the ICare waiting list or contacted us.
                {"\n"}
                Unsubscribe: reply with “unsubscribe” or click the unsubscribe link
                (if available).
                {"\n"}
                Privacy: see our Privacy Policy.
                {"\n"}
                Operator: {company.operator} trading as {company.tradingAs},{" "}
                {company.address}.
              </p>
            </div>
          </div>

          {/* LEGAL BASIS */}
          <div className={styles.section} id="law">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>5) Legal basis (UK GDPR)</h2>
            <p className={styles.p}>We process personal data under these legal bases:</p>
            <ul className={styles.ul}>
              <li>
                <strong>Contract / steps before contract:</strong> providing the
                features you request (e.g., waitlist).
              </li>
              <li>
                <strong>Legitimate interests:</strong> security, fraud prevention,
                and improving the service.
              </li>
              <li>
                <strong>Consent:</strong> where required (e.g., optional email
                updates and non-essential cookies).
              </li>
              <li>
                <strong>Legal obligations:</strong> where required by law.
              </li>
            </ul>
          </div>

          {/* SHARING */}
          <div className={styles.section} id="share">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>6) Sharing your data</h2>
            <p className={styles.p}>
              We do not sell your personal data. We may share it only when necessary:
            </p>
            <ul className={styles.ul}>
              <li>
                <strong>With service providers:</strong> hosting, email delivery,
                analytics, and security tools (to run the MVP).
              </li>
              <li>
                <strong>For legal reasons:</strong> if required by law, to protect
                users, or to prevent misuse.
              </li>
            </ul>
            <p className={styles.small}>
              If we add payments later, payment providers process payment data under
              their own privacy policies. We will update this page accordingly.
            </p>
          </div>

          {/* RETENTION */}
          <div className={styles.section} id="retain">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>7) Data retention</h2>
            <p className={styles.p}>
              We keep data only as long as needed for the MVP service, safety, and
              legal requirements.
            </p>
            <ul className={styles.ul}>
              <li>Waitlist data: until the MVP launch period ends or you request deletion.</li>
              <li>Support enquiries: as long as needed to respond and resolve issues.</li>
              <li>Technical logs: kept for security and debugging for a limited period.</li>
            </ul>
          </div>

          {/* RIGHTS */}
          <div className={styles.section} id="rights">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>8) Your rights</h2>
            <p className={styles.p}>Under UK GDPR, you may have the right to:</p>
            <ul className={styles.ul}>
              <li>Request access to your data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion (where applicable)</li>
              <li>Object to processing or request restriction</li>
              <li>Request data portability</li>
              <li>Withdraw consent (where processing is based on consent)</li>
            </ul>

            <p className={styles.small}>
              To exercise your data rights (DSAR), email us at{" "}
              <a href={`mailto:${company.email}`} className={styles.link}>
                {company.email}
              </a>{" "}
              with your name, the email you used on ICare, and what you’d like us
              to do (access, correction, deletion, etc.).
            </p>
          </div>

          {/* CONTACT */}
          <div className={styles.section} id="contact">
            <div className={styles.sectionIdSpacer} />
            <h2 className={styles.h2}>9) Contact</h2>
            <p className={styles.p}>Questions about privacy? Contact:</p>
            <ul className={styles.ul}>
              <li>
                <strong>{company.brand}</strong> — {company.operator} trading as{" "}
                {company.tradingAs}
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${company.email}`} className={styles.link}>
                  {company.email}
                </a>
              </li>
              <li>Address: {company.address}</li>
            </ul>
            <p className={styles.small}>
              We may update this policy as the MVP grows. We’ll post changes here
              with a new “Last updated” date.
            </p>
          </div>

          {/* OPTIONAL: meta chips at bottom */}
          <div className={`${styles.chipRow} ${styles.chipRowBottom}`}>
            <div className={styles.chip}>Last updated: {company.lastUpdated}</div>
            <div className={styles.chip}>
              Operator: {company.operator} trading as {company.tradingAs}
            </div>
            <div className={styles.chip}>Address: {company.address}</div>
            <div className={styles.chip}>
              Contact:{" "}
              <a
                href={`mailto:${company.email}`}
                className={`${styles.link} ${styles.linkNoUnderline}`}
              >
                {company.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
