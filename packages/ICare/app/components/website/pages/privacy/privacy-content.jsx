import styles from "./privacy-content.module.scss";

const company = {
  brand: "iCare",
  privacyEmail: "privacy@icare.co.uk",
  generalEmail: "hello@icare.co.uk",
  lastUpdated: "February 2026"
};

export default function PrivacyContent() {
  return (
    <section className={styles.page} aria-label="Privacy Policy">
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <h2 className={styles.h1}>Privacy Policy</h2>

          <div className={styles.metaRow}>
            <span>
              Last updated: <strong>{company.lastUpdated}</strong>
            </span>
          </div>

          <p className={styles.lead}>
            This privacy policy explains how we collect, use, and protect your information when you
            join our waitlist or subscribe to our newsletter.
          </p>

          <p className={styles.paragraph}>
            We&apos;re committed to protecting your privacy and being transparent about what we do with
            your data. We only collect what we need, and we explain everything in plain English.
          </p>

        </header>

        {/* 1) WHO WE ARE */}
        <section id="who" className={styles.section} aria-label="Who we are">
          <h2 className={styles.h2}>Who we are</h2>

          <p className={styles.paragraph}>
            {company.brand} is building a platform to connect families with trusted companions for
            elderly adults across the UK.
          </p>

          <div className={styles.tableWrap} role="region" aria-label="Who we are details">
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th scope="row">Data Controller</th>
                  <td>iCare Ltd</td>
                </tr>
                <tr>
                  <th scope="row">Privacy contact</th>
                  <td>
                    <a className={styles.inlineLink} href={`mailto:${company.privacyEmail}`}>
                      {company.privacyEmail}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2) WHAT WE COLLECT */}
        <section id="data" className={styles.section} aria-label="What we collect">
          <h2 className={styles.h2}>What information we collect</h2>

          <p className={styles.paragraph}>
            Right now, we only collect information when you join our waitlist or subscribe to our
            newsletter.
          </p>

          <div className={styles.tableWrap} role="region" aria-label="Information we collect">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Information</th>
                  <th scope="col">Waitlist</th>
                  <th scope="col">Newsletter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Email address</strong></td>
                  <td>Required</td>
                  <td>Required</td>
                </tr>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>Optional</td>
                  <td>Optional</td>
                </tr>
                <tr>
                  <td><strong>Role preference</strong></td>
                  <td>Optional</td>
                  <td>&mdash;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            <strong>How we collect it:</strong> You provide this information directly when you fill
            out a signup form on our website.
          </p>

        </section>

        {/* 3) WHY WE COLLECT */}
        <section id="use" className={styles.section} aria-label="Why we collect this information">
          <h2 className={styles.h2}>Why we collect this information</h2>

          <div className={styles.tableWrap} role="region" aria-label="Purpose of data collection">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Audience</th>
                  <th scope="col">What we send</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Waitlist members</strong></td>
                  <td>
                    Launch progress updates, platform readiness notification, priority
                    access before public launch, exclusive updates on what we&apos;re building
                  </td>
                </tr>
                <tr>
                  <td><strong>Newsletter subscribers</strong></td>
                  <td>
                    Weekly care guidance content, practical advice about elderly care and
                    companionship, research and resources to help families
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            <strong>Optional information</strong> (name and role preference) helps us personalise
            our emails and send you content that&apos;s more relevant to you.
          </p>

          <p className={styles.paragraph}>
            <strong>Legal basis:</strong> We process your data based on your consent. When you tick
            the consent box and submit the form, you&apos;re giving us permission to contact you.
          </p>
        </section>

        {/* 4) HOW WE USE */}
        <section className={styles.section} aria-label="How we use your information">
          <h2 className={styles.h2}>How we use your information</h2>

          <p className={styles.paragraph}>
            We will only use your email address to send you the specific emails you signed up for.
          </p>

          <div className={styles.tableWrap} role="region" aria-label="How we use your data">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Commitment</th>
                  <th scope="col">We will NOT</th>
                  <th scope="col">We WILL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Selling data</strong></td>
                  <td>Sell your email address to anyone</td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <td><strong>Third-party sharing</strong></td>
                  <td>Share your information for their marketing</td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <td><strong>Communications</strong></td>
                  <td>Send you spam or unrelated marketing</td>
                  <td>Send the waitlist updates or newsletter you requested</td>
                </tr>
                <tr>
                  <td><strong>Data security</strong></td>
                  <td>Use your data for purposes you didn&apos;t agree to</td>
                  <td>Keep your information secure</td>
                </tr>
                <tr>
                  <td><strong>Unsubscribing</strong></td>
                  <td>&mdash;</td>
                  <td>Respect your right to unsubscribe at any time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5) SHARING */}
        <section id="share" className={styles.section} aria-label="Who we share your information with">
          <h2 className={styles.h2}>Who we share your information with</h2>

          <p className={styles.paragraph}>
            We use a trusted email service provider to send emails. This provider processes your
            email address on our behalf.
          </p>

          <div className={styles.tableWrap} role="region" aria-label="Email provider obligations">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Obligation</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Data Processing Agreement</strong></td>
                  <td>Signed and in place</td>
                </tr>
                <tr>
                  <td><strong>Data protection</strong></td>
                  <td>Required to protect your data</td>
                </tr>
                <tr>
                  <td><strong>Permitted use</strong></td>
                  <td>Can only use your data to send emails on our behalf</td>
                </tr>
                <tr>
                  <td><strong>Restricted use</strong></td>
                  <td>Cannot use your data for their own purposes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            We don&apos;t share your information with anyone else. If this changes, we&apos;ll update this
            policy and let you know.
          </p>
        </section>

        {/* 6) RETENTION */}
        <section id="retain" className={styles.section} aria-label="How long we keep your information">
          <h2 className={styles.h2}>How long we keep your information</h2>

          <div className={styles.tableWrap} role="region" aria-label="Retention periods">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Retention period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Waitlist members</strong></td>
                  <td>
                    Until you become a platform user, or a maximum of 24 months if you don&apos;t
                    engage. If you don&apos;t open or click any emails for 12 months, we&apos;ll
                    send a re-engagement email.
                  </td>
                </tr>
                <tr>
                  <td><strong>Newsletter subscribers</strong></td>
                  <td>As long as you&apos;re subscribed. You can unsubscribe at any time.</td>
                </tr>
                <tr>
                  <td><strong>After you unsubscribe</strong></td>
                  <td>
                    We remove your information within 30 days. We keep your email on a suppression
                    list to avoid re-adding you.
                  </td>
                </tr>
                <tr>
                  <td><strong>If you request deletion</strong></td>
                  <td>We delete your information within 30 days of your request.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7) YOUR RIGHTS */}
        <section id="rights" className={styles.section} aria-label="Your rights">
          <h2 className={styles.h2}>Your rights</h2>

          <p className={styles.paragraph}>
            Under UK data protection law, you have the right to:
          </p>

          <div className={styles.tableWrap} role="region" aria-label="Your data rights">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Right</th>
                  <th scope="col">What this means</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Access your data</strong></td>
                  <td>Ask us what information we hold about you</td>
                </tr>
                <tr>
                  <td><strong>Correct your data</strong></td>
                  <td>Ask us to update or correct your information</td>
                </tr>
                <tr>
                  <td><strong>Delete your data</strong></td>
                  <td>Ask us to delete your information completely</td>
                </tr>
                <tr>
                  <td><strong>Withdraw consent</strong></td>
                  <td>Unsubscribe from emails at any time. Every email includes an unsubscribe link.</td>
                </tr>
                <tr>
                  <td><strong>Object to processing</strong></td>
                  <td>Tell us to stop using your information</td>
                </tr>
                <tr>
                  <td><strong>Data portability</strong></td>
                  <td>Ask for a copy of your information in a common format</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            To exercise any of these rights, email us at{" "}
            <a className={styles.inlineLink} href={`mailto:${company.privacyEmail}`}>
              {company.privacyEmail}
            </a>
            . We&apos;ll respond within 30 days.
          </p>

          <p className={styles.paragraph}>
            To unsubscribe quickly, click the unsubscribe link at the bottom of any email we send you.
          </p>
        </section>

        {/* 8) SECURITY */}
        <section className={styles.section} aria-label="How we protect your information">
          <h2 className={styles.h2}>How we protect your information</h2>

          <div className={styles.tableWrap} role="region" aria-label="Security measures">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Email service</strong></td>
                  <td>Reputable, GDPR-compliant provider</td>
                </tr>
                <tr>
                  <td><strong>Payment data</strong></td>
                  <td>Not stored (we don&apos;t take payments yet)</td>
                </tr>
                <tr>
                  <td><strong>Access control</strong></td>
                  <td>Limited to authorised personnel only</td>
                </tr>
                <tr>
                  <td><strong>Encryption</strong></td>
                  <td>Secure connections (HTTPS) on our website</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            No system is 100% secure, but we do everything reasonable to protect your data.
          </p>
        </section>

        {/* 9) CONTACT */}
        <section id="contact" className={styles.section} aria-label="Contact us about privacy">
          <h2 className={styles.h2}>How to contact us about privacy</h2>

          <p className={styles.paragraph}>
            If you have questions about this privacy policy or how we handle your data:
          </p>

          <div className={styles.tableWrap} role="region" aria-label="Contact details">
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th scope="row">Privacy enquiries</th>
                  <td>
                    <a className={styles.inlineLink} href={`mailto:${company.privacyEmail}`}>
                      {company.privacyEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">General contact</th>
                  <td>
                    <a className={styles.inlineLink} href={`mailto:${company.generalEmail}`}>
                      {company.generalEmail}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.paragraph}>
            If you&apos;re not satisfied with our response, you have the right to complain to the{" "}
            <a
              className={styles.inlineLink}
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Information Commissioner&apos;s Office (ICO)
            </a>
            , the UK data protection regulator.
          </p>
        </section>

        {/* 10) CHANGES */}
        <section className={styles.section} aria-label="Changes to this policy">
          <h2 className={styles.h2}>Changes to this policy</h2>

          <p className={styles.paragraph}>
            We may update this privacy policy as we develop our platform.
          </p>

          <ul className={styles.ul}>
            <li>We&apos;ll update the &ldquo;Last Updated&rdquo; date at the top of this page</li>
            <li>For significant changes, we&apos;ll send an email to let you know</li>
            <li>We&apos;ll never reduce your rights without your consent</li>
          </ul>

        </section>

        {/* 11) QUESTIONS */}
        <section className={styles.section} aria-label="Questions">
          <h2 className={styles.h2}>Questions?</h2>

          <p className={styles.paragraph}>
            We want to be transparent about how we use your information. If anything in this policy
            is unclear, please ask. Email{" "}
            <a className={styles.inlineLink} href={`mailto:${company.privacyEmail}`}>
              {company.privacyEmail}
            </a>{" "}
            and we&apos;ll explain.
          </p>
        </section>
      </div>
    </section>
  );
}
