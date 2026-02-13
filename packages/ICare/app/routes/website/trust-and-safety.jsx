import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import styles from "~/styles/pages/trust-and-safety.module.scss";
import { NavLink } from "react-router";

export const meta = () => {
  return [
    { title: "Trust and Safety - How iCare Protects You | iCare" },
    { name: "description", content: "iCare is built around transparency, respect, and informed choice. Learn about our platform safeguards, caregiver profiles, verification, and how to stay safe." },
    { name: "keywords", content: "iCare trust and safety, safe companionship care, caregiver verification, elderly care safeguards UK" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Trust and Safety - iCare" },
    { property: "og:description", content: "Learn how iCare helps families and caregivers connect with confidence through platform safeguards, verification, and practical safety guidance." },
    { property: "og:url", content: "https://icare-app.co.uk/trust-and-safety" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og-trust-safety.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Trust and Safety at iCare: Connecting with confidence" },

    // Twitter Card
    { name: "twitter:title", content: "Trust and Safety - iCare" },
    { name: "twitter:description", content: "Platform safeguards, caregiver verification, and practical safety guidance for families and caregivers." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/twitter-trust-safety.jpg" },
    { name: "twitter:image:alt", content: "iCare Trust and Safety" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/trust-and-safety" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Trust and Safety",
  "description": "iCare's trust and safety information for families and caregivers, including platform safeguards, verification, and reporting procedures.",
  "url": "https://icare-app.co.uk/trust-and-safety"
};

function TickItem({ children }) {
  return (
    <li className={styles.checklistItem}>
      <span aria-hidden="true" className={styles.tick} />
      <span>{children}</span>
    </li>
  );
}

export default function TrustAndSafetyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ICareNavbar />

      <section className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <h1 className={styles.h1}>Trust and Safety</h1>

          <p className={styles.lead}>
            ICare is a platform designed to help caregivers and care receivers connect
            with confidence, clarity, and respect. While no online marketplace can
            eliminate all risks, our goal is to provide tools and information that help
            people make informed decisions.
          </p>

          <p className={styles.p}>
            ICare is built around transparency, respect, and informed choice, helping
            families feel confident as they navigate care decisions.
          </p>
        </header>

        <div className={styles.separator} />

        {/* OUR PROMISE */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Our Promise to You</h2>

          <p className={styles.p}>
            ICare is a marketplace, not a care provider. We do not employ caregivers,
            arrange care on your behalf, or deliver care services directly. Instead,
            we focus on providing a clear environment where individuals can connect,
            communicate, and decide what works best for their needs.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            This means families decide who they want to speak to, interview, and hire —
            and caregivers choose the work that fits them. Hours, duties, start dates,
            and pay are agreed directly between the people involved.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            We support safer decisions by providing platform safeguards, clear guidance,
            and tools to report concerns. Any verification or profile information
            available on ICare is intended to support transparency and informed choice,
            but it does not replace personal judgment, interviews, or due diligence by
            users.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Tip: keep early conversations on ICare, ask questions, and take your time
            before agreeing to anything.
          </p>
        </section>

        <div className={styles.separator} />

        {/* CAREGIVER PROFILES */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Caregiver Profiles</h2>

          <p className={styles.p}>
            Caregivers on ICare create profiles describing their experience,
            availability, location, and the types of care they offer. We encourage
            caregivers to keep this information accurate and up to date so families
            can make informed choices.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Families can use profiles to compare fit and ask the right questions —
            for example, what type of support is offered (personal care,
            companionship, mobility support, overnight presence, household help),
            what availability looks like, and what boundaries the caregiver has.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Profile information is provided by caregivers themselves. Families are
            encouraged to request interviews, references, and relevant documentation
            where appropriate.
          </p>

          <p className={styles.p}>
            Information shown on profiles is provided by users and should be considered
            informational only.
          </p>
        </section>

        <div className={styles.separator} />

        {/* VERIFICATION */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Verification and Platform Safeguards</h2>

          <p className={styles.p}>
            ICare provides safeguards designed to encourage transparency and respectful
            behaviour. These include secure on-platform messaging, profile prompts that
            support clearer information, and tools to block or report users.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Some caregivers may choose to share documents such as references,
            certifications, or background checks. ICare does not independently verify
            all information shared by users and encourages both families and caregivers
            to conduct their own checks before agreeing to care.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Platform safeguards are designed to support safer interactions, but they
            cannot guarantee outcomes or replace personal judgment.
          </p>
        </section>

        <div className={styles.separator} />

        {/* STAYING SAFE */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Staying Safe: Practical Guidance</h2>

          <p className={styles.p}>
            Small steps can make a big difference. Below are practical recommendations
            commonly used across trusted care marketplaces.
          </p>

          <p className={styles.p}>
            These are general recommendations only and may not be appropriate in every situation.
          </p>

          <div className={styles.spacer} />

          <h3 className={styles.h3}>For families and care receivers:</h3>
          <ul className={styles.checklist}>
            <TickItem>Arrange a video or phone call before meeting in person.</TickItem>
            <TickItem>Ask for relevant documents where appropriate (ID, references, DBS, certifications).</TickItem>
            <TickItem>Agree duties, hours, start date, and pay clearly before care begins.</TickItem>
            <TickItem>For early meetings, involve a family member or trusted person.</TickItem>
            <TickItem>Be cautious of pressure tactics or requests for upfront payments.</TickItem>
          </ul>

          <div className={styles.spacer} />

          <h3 className={styles.h3}>For caregivers:</h3>
          <ul className={styles.checklist}>
            <TickItem>Confirm care needs, schedule, and expectations before accepting work.</TickItem>
            <TickItem>Agree terms clearly and keep a written record of key details.</TickItem>
            <TickItem>Keep communication on ICare until trust is established.</TickItem>
            <TickItem>Avoid sharing sensitive documents outside the platform.</TickItem>
            <TickItem>Trust your instincts if something feels unclear or unsafe.</TickItem>
          </ul>
        </section>

        <div className={styles.separator} />

        {/* REPORTING */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Reporting Concerns</h2>

          <p className={styles.p}>
            If something does not feel right, we encourage users to trust their instincts.
            ICare provides ways to report concerns, inappropriate behaviour, or suspected
            misuse of the platform so that issues can be reviewed.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            Please report immediately if you notice requests for upfront payments,
            pressure to move conversations off-platform, harassment, discrimination,
            or suspected impersonation.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            In case of emergency or immediate danger, contact local emergency services.
            ICare cannot provide emergency response.
          </p>
        </section>

        <div className={styles.separator} />

        {/* PRIVACY */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Privacy and Data Protection</h2>

          <p className={styles.p}>
            We respect the privacy of everyone using ICare. Personal information is
            collected only to support core platform functionality such as account
            creation, communication between users, and safety-related features. We do
            not sell personal data to third parties.
          </p>

          <div className={styles.spacer} />

          <p className={styles.p}>
            We follow data minimisation and purpose limitation principles: we collect
            what is necessary, use it to operate the platform and support safety, and
            restrict access to authorised systems and staff.
          </p>
          <p className={styles.p}>
            For more details, please see our{" "}
            <NavLink to="/privacy" className={styles.inlineLink}>
              Privacy Policy
            </NavLink>
            .
          </p>
        </section>

        <div className={styles.separator} />

        {/* DISCLAIMER */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Important Disclaimer</h2>

          <p className={styles.p}>
            ICare does not provide medical, legal, or professional care advice and does
            not deliver care services. Users are responsible for conducting their own
            due diligence and making decisions appropriate to their individual
            circumstances. In case of emergency, always contact local emergency services.
          </p>
        </section>
      </section>

      <ICareFooter />
    </>
  );
}
