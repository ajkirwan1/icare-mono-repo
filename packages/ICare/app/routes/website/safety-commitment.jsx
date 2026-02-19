import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import styles from "~/styles/pages/safety-commitment.module.scss";

export const meta = () => {
  return [
    { title: "Our Safety Commitment - Trusted Companionship Care | iCare" },
    { name: "description", content: "Safety isn't an afterthought at iCare - it's the foundation of everything we build. Learn how we're creating a trusted platform for elderly companionship care." },
    { name: "keywords", content: "trusted caregivers UK, safe companionship care, verified caregivers, elderly care safety" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Our Commitment to Safety - iCare" },
    { property: "og:description", content: "Safety is the foundation of everything we build. Learn about our principles and commitments to families and caregivers." },
    { property: "og:url", content: "https://icare-app.co.uk/safety-commitment" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/default.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Shield with checkmark: Our commitment to safety" },

    // Twitter Card
    { name: "twitter:title", content: "Our Commitment to Safety - iCare" },
    { name: "twitter:description", content: "Trust is everything. Learn about the 5 safety principles that guide everything we build." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/default.jpg" },
    { name: "twitter:image:alt", content: "Safety principles: Identity, Choice, Transparency, Support, Improvement" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/safety-commitment" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Our Commitment to Safety",
  "description": "iCare's safety principles and commitments for families and caregivers.",
  "url": "https://icare-app.co.uk/safety-commitment",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Safety Principles",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Identity First",
        "description": "Every caregiver completes mandatory ID verification, right to work checks, and admin approval before connecting with families."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Choice and Control",
        "description": "You decide who you work with - families choose caregivers, caregivers choose families."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Transparency",
        "description": "Clear information to make informed decisions, presented honestly without hidden terms."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Support When Needed",
        "description": "Help is available if something goes wrong or if you have questions or concerns."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Continuous Improvement",
        "description": "We're always learning, adapting, and improving our safety measures."
      }
    ]
  }
};

function TickItem({ children }) {
  return (
    <li className={styles.checklistItem}>
      <span aria-hidden="true" className={styles.tick} />
      <span>{children}</span>
    </li>
  );
}

export default function SafetyCommitment() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ICareNavbar />

      <main className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <h1 className={styles.h1}>Our Commitment to Safety</h1>

          <p className={styles.lead}>
            When you&apos;re inviting someone into your loved one&apos;s life &mdash; or
            when you&apos;re entering someone&apos;s home as a caregiver &mdash; trust
            isn&apos;t optional. It&apos;s everything.
          </p>

          <p className={styles.p}>
            Safety isn&apos;t a feature we&apos;re adding to ICare. It&apos;s the
            foundation of everything we&apos;re building. We know that without trust,
            nothing else matters. And we know that trust must be earned through actions,
            not just words.
          </p>
        </header>

        <hr className={styles.hr} />

        {/* SAFETY PRINCIPLES */}
        <section className={styles.section} aria-labelledby="safety-principles">
          <h2 id="safety-principles" className={styles.h2}>Our Safety Principles</h2>

          <p className={styles.p}>
            These five principles shape how we&apos;re building ICare. They&apos;re not
            marketing messages &mdash; they&apos;re the standards we hold ourselves to.
          </p>

          <ol className={styles.principlesList}>
            <li className={styles.principleItem}>
              <h3 className={styles.h3}>Identity First</h3>
              <p className={styles.p}>
                You deserve to know who you&apos;re working with. Every caregiver
                completes mandatory ID verification, right to work checks, and admin
                approval before they can connect with families through ICare. Voluntary
                DBS certificates are verified and displayed as a trust badge.
              </p>
            </li>

            <li className={styles.principleItem}>
              <h3 className={styles.h3}>Choice and Control</h3>
              <p className={styles.p}>
                Safety isn&apos;t just about verification &mdash; it&apos;s about
                empowerment. Families choose which caregivers they want to work with.
                Caregivers choose which families they want to support. No one is forced into
                a relationship they&apos;re not comfortable with.
              </p>
            </li>

            <li className={styles.principleItem}>
              <h3 className={styles.h3}>Transparency</h3>
              <p className={styles.p}>
                You can&apos;t make good decisions without good information. We&apos;re
                committed to giving you the details you need about who you&apos;re
                considering working with &mdash; presented clearly, honestly, and without
                hidden fine print.
              </p>
            </li>

            <li className={styles.principleItem}>
              <h3 className={styles.h3}>Support When Needed</h3>
              <p className={styles.p}>
                We hope you never need it, but if something doesn&apos;t feel right &mdash;
                if there&apos;s a concern, a problem, or even just a question &mdash; there
                will be someone to talk to. We&apos;re building support systems to respond
                when you need help.
              </p>
            </li>

            <li className={styles.principleItem}>
              <h3 className={styles.h3}>Continuous Improvement</h3>
              <p className={styles.p}>
                We won&apos;t get everything right on day one. But we&apos;re committed to
                learning, improving, and responding when we discover better ways to protect
                our community.
              </p>
            </li>
          </ol>
        </section>

        <hr className={styles.hr} />

        {/* FOR FAMILIES */}
        <section className={styles.section} aria-labelledby="families">
          <h2 id="families" className={styles.h2}>For Families: Peace of Mind Starts Here</h2>

          <p className={styles.p}>
            We understand what you&apos;re worried about. Your loved one is vulnerable.
            Their safety, dignity, and wellbeing matter more than anything. Inviting a
            stranger into their life &mdash; into their home &mdash; is a big decision.
          </p>

          <p className={styles.p}>
            <strong>We take this as seriously as you do.</strong> Your parent, spouse, or
            relative matters to us too. Not as a transaction or a user profile, but as a
            real person deserving of respect, care, and protection.
          </p>

          <p className={styles.p}>
            <strong>We&apos;re building safety into every step.</strong> From the moment
            someone joins our platform to the moment they connect with your loved one,
            we&apos;re thinking about risk, trust, and safeguarding. Not as an
            afterthought, but as the core of what we do.
          </p>

          <p className={styles.p}>
            <strong>We&apos;ll give you the information you need.</strong> You&apos;ll be
            able to see caregiver profiles, read about their experience, and understand
            who they are before making a decision. You won&apos;t be pressured into
            working with someone you don&apos;t trust.
          </p>

          <p className={styles.p}>
            We can&apos;t promise that care will always be perfect &mdash; no one can.
            But we can promise that we&apos;ll never take shortcuts when it comes to
            safety. Your loved one deserves that. So do you.
          </p>
        </section>

        <hr className={styles.hr} />

        {/* FOR CAREGIVERS */}
        <section className={styles.section} aria-labelledby="caregivers">
          <h2 id="caregivers" className={styles.h2}>For Caregivers: We Protect You Too</h2>

          <p className={styles.p}>
            Safety isn&apos;t just about the people receiving care. It&apos;s about
            protecting caregivers too.
          </p>

          <p className={styles.p}>
            <strong>A professional environment.</strong> You deserve to work in an
            environment where boundaries are respected, where you feel safe entering
            someone&apos;s home, and where your wellbeing matters. We&apos;re building a
            platform that takes your safety seriously.
          </p>

          <p className={styles.p}>
            <strong>Support when you need it.</strong> If something feels wrong &mdash;
            if a family makes you uncomfortable, if a situation feels unsafe, or if you
            just need guidance &mdash; there will be someone to talk to. You
            shouldn&apos;t have to navigate difficult situations alone.
          </p>

          <p className={styles.p}>
            <strong>A community built on trust.</strong> The verification process
            we&apos;re building protects you as much as it protects families. It ensures
            that everyone in our community has been properly welcomed and that trust
            flows both ways.
          </p>

          <p className={styles.p}>
            <strong>Clear expectations.</strong> You&apos;ll know what&apos;s expected of
            you, what families are looking for, and what kind of work you&apos;re
            agreeing to. No surprises. No hidden terms. Just honest, clear
            communication.
          </p>
        </section>

        <hr className={styles.hr} />

        {/* BUILDING TRUST */}
        <section className={styles.section} aria-labelledby="building-trust">
          <h2 id="building-trust" className={styles.h2}>Building Trust Together</h2>

          <p className={styles.p}>
            We can&apos;t create a safe platform on our own. Safety is something we
            build together &mdash; families, caregivers, and the ICare team.
          </p>

          <p className={styles.p}>
            <strong>We&apos;re taking a progressive approach.</strong> We&apos;re not
            launching with every feature on day one. We&apos;re starting with
            companionship care &mdash; meaningful, important work that helps tackle
            loneliness and brings connection to elderly adults. As we learn, grow, and
            prove ourselves, we&apos;ll expand carefully and thoughtfully.
          </p>

          <p className={styles.p}>
            <strong>We&apos;ll be transparent about our journey.</strong> We won&apos;t
            pretend to have all the answers. When we face challenges, we&apos;ll be
            honest. When we make improvements, we&apos;ll share them. When we
            don&apos;t know something, we&apos;ll say so.
          </p>

          <p className={styles.p}>
            <strong>We need your help.</strong> If you see something that concerns you,
            if you have an idea that could make us safer, or if you experience something
            that doesn&apos;t feel right &mdash; tell us. We&apos;re building this
            together, and your voice matters.
          </p>
        </section>

        <hr className={styles.hr} />

        {/* OUR PROMISE */}
        <section className={styles.section} aria-labelledby="our-promise">
          <h2 id="our-promise" className={styles.h2}>Our Promise to You</h2>

          <p className={styles.p}>
            Safety will never be a marketing message at ICare. It will always be our
            foundation.
          </p>

          <p className={styles.p}>We promise to:</p>

          <ul className={styles.checklist}>
            <TickItem>Put people before profit when safety is at stake</TickItem>
            <TickItem>
              Build verification and safeguarding into everything we do
            </TickItem>
            <TickItem>
              Give you the information and control you need to make good decisions
            </TickItem>
            <TickItem>
              Be transparent about what we know and what we&apos;re still learning
            </TickItem>
            <TickItem>Support you when things go wrong</TickItem>
            <TickItem>Listen, improve, and never stop getting safer</TickItem>
          </ul>

          <p className={styles.p}>
            We&apos;re building ICare because elderly care deserves better. Because
            families deserve peace of mind. Because caregivers deserve a professional,
            respectful environment. And because trust should be the foundation of every
            care relationship, not a luxury.
          </p>
        </section>
      </main>

      <ICareFooter />
    </>
  );
}
