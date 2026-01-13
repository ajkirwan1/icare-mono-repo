import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 1rem",
    paddingTop: "calc(var(--navbar-height) + 5vh)",
    display: "grid",
    gap: "3rem"
  },
  section: {
    display: "grid",
    gap: "1rem"
  },
  intro: {
    lineHeight: 1.6
  },
  introImage: {
    width: "420px",
    maxWidth: "45%",
    height: "auto",
    float: "right",
    margin: "0 0 1.5rem 2rem",
    borderRadius: "12px"
  }
};

export default function TrustAndSafetyPage() {
  return (
    <>
      <ICareNavbar />

      <section style={styles.page}>
        <h1>Trust and Safety</h1>
        <p>
          Trust and safety are at the heart of ICare. We are building a platform
          designed to help caregivers and care receivers connect with confidence,
          clarity, and respect. While no online marketplace can eliminate all
          risks, our goal is to provide tools and information that help people make
          informed decisions.
        </p>
        <p>
          ICare is built around transparency, respect, and informed choice, helping
          families feel confident as they navigate care decisions.
        </p>
        <div style={styles.section}>
          <h2>Our Promise to You</h2>
          <div style={styles.intro}>
            <img
              src="images/web/trust-and-security/key.webp"
              alt="Trust and security"
              style={styles.introImage}
            />
            <p style={{ marginBottom: "1rem" }}>
              ICare is a marketplace, not a care provider. We do not employ caregivers
              or deliver care services directly. Instead, we focus on creating a safe,
              transparent environment where individuals can connect, communicate, and
              decide what works best for their needs.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
          </div>
        </div>
        <div style={styles.section}>
          <h2>Caregiver Profiles</h2>
          <p>
            Caregivers on ICare create profiles that describe their experience,
            availability, and the types of care they offer. We encourage caregivers
            to provide accurate, up-to-date information so care receivers and
            families can make informed choices.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo.
          </p>
        </div>
        <div style={styles.section}>
          <h2>Privacy and Data Protection</h2>
          <p>
            We respect the privacy of everyone using ICare. Personal information is
            collected only to support the core functionality of the platform, such
            as account creation and communication between users. We do not sell
            personal data to third parties.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
            sequi nesciunt.
          </p>
        </div>
        <div style={styles.section}>
          <h2>Reporting Concerns</h2>
          <p>
            If something does not feel right, we encourage users to trust their
            instincts. ICare provides ways to report concerns, inappropriate
            behavior, or suspected misuse of the platform so that issues can be
            reviewed and addressed.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
        <div style={styles.section}>
          <h2>Important Disclaimer</h2>
          <p>
            ICare does not provide medical, legal, or professional care advice.
            Users are responsible for conducting their own due diligence and for
            making decisions that are appropriate for their individual situations.
            In case of emergency, always contact local emergency services.
          </p>
        </div>
      </section>
      <ICareFooter />
    </>
  );
}
