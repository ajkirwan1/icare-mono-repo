import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ContactUsForm from "~/components/website/common/forms/contact-us-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import styles from "~/styles/pages/contact-us.module.scss";

export const meta = () => {
  return [
    { title: "Contact Us - Get in Touch | iCare" },
    { name: "description", content: "Contact iCare for enquiries about companionship care. Families, caregivers, and partners can reach us by email or through our contact form." },
    { name: "keywords", content: "contact iCare, elderly care enquiries UK, caregiver support contact, companionship care help" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Contact Us - iCare" },
    { property: "og:description", content: "Get in touch with iCare. Whether you're a family, caregiver, or partner, we'd love to hear from you." },
    { property: "og:url", content: "https://icare-app.co.uk/contact" },
    { property: "og:image", content: "https://icare-app.co.uk/images/og/default.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Contact iCare: Get in touch with our team" },

    // Twitter Card
    { name: "twitter:title", content: "Contact Us - iCare" },
    { name: "twitter:description", content: "Reach out to iCare for enquiries about companionship care for families and caregivers." },
    { name: "twitter:image", content: "https://icare-app.co.uk/images/og/default.jpg" },
    { name: "twitter:image:alt", content: "Contact iCare" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare-app.co.uk/contact" }
  ];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Us",
  "description": "Contact iCare for enquiries about companionship care in the UK.",
  "url": "https://icare-app.co.uk/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "iCare",
    "email": "hello@icare-app.co.uk",
    "url": "https://icare-app.co.uk",
    "sameAs": [
      "https://www.linkedin.com/company/icare",
      "https://www.facebook.com/icare"
    ]
  }
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ICareNavbar />

      <main>
        {/* ===== CONTACT INFO SECTION ===== */}
        <section aria-labelledby="contact-heading" className={styles.infoSection}>
          <div className={styles.infoContainer}>
            <div className={styles.infoHeader}>
              <h1 id="contact-heading" className={styles.h1}>Contact us</h1>
              <p className={styles.lead}>
                Whether you&apos;re a family, a caregiver, or a potential partner &mdash;
                we&apos;d love to hear from you.
              </p>
            </div>

            <ul className={styles.cardGrid}>
              <li className={styles.card}>
                <h2 className={styles.h3}>General enquiries</h2>
                <p className={styles.p}>
                  Email us and we&apos;ll respond as soon as possible.
                </p>
                <address className={styles.small}>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:hello@icare-app.co.uk" className={styles.emailLink}>
                    hello@icare-app.co.uk
                  </a>
                </address>
                <p className={styles.small}>
                  We aim to reply within 2 business days. During pre-launch, some
                  replies may take a little longer.
                </p>
              </li>

              <li className={styles.card}>
                <h2 className={styles.h3}>For families</h2>
                <p className={styles.p}>
                  If you&apos;re exploring companionship care for a parent or loved one,
                  tell us what you need.
                </p>
                <p className={styles.small}>
                  We&apos;re not yet fully operational &mdash; your message helps us
                  build something genuinely useful.
                </p>
              </li>

              <li className={styles.card}>
                <h2 className={styles.h3}>For caregivers</h2>
                <p className={styles.p}>
                  If you&apos;re interested in offering care independently through ICare,
                  we&apos;d love to hear about your experience.
                </p>
                <p className={styles.p}>
                  Tell us what would make care work clearer, fairer, and easier to manage.
                </p>
              </li>

              <li className={styles.card}>
                <h2 className={styles.h3}>Social media</h2>
                <p className={styles.p}>
                  We&apos;re building ICare in public and sharing our journey as we go.
                </p>
                <p className={styles.p}>
                  Follow along for updates, care guidance content, and behind-the-scenes
                  insights:
                </p>

                <nav aria-label="Social media" className={styles.socialNav}>
                  <a
                    href="https://www.linkedin.com/company/icare"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ICare on LinkedIn"
                    className={styles.socialLink}
                  >
                    <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
                  </a>

                  <a
                    href="https://www.facebook.com/icare"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ICare on Facebook"
                    className={styles.socialLink}
                  >
                    <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
                  </a>
                </nav>
              </li>
            </ul>

            <section aria-labelledby="response-heading" className={styles.responseSection}>
              <h2 id="response-heading" className={styles.h3}>Response times</h2>
              <p className={styles.p}>
                We&apos;re a small team building something meaningful. While we aim to
                respond to all enquiries within <strong>2 business days</strong>, some
                questions may take longer as we focus on preparing the platform for launch.
              </p>
              <p className={styles.p}>
                Thank you for your patience and for your interest in ICare.
              </p>
            </section>
          </div>
        </section>

        {/* ===== FORM SECTION (photo background) ===== */}
        <section aria-labelledby="form-heading" className={styles.formSection}>
          <div aria-hidden="true" className={styles.formOverlay} />
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 id="form-heading" className={styles.h2}>Send us a message</h2>
              <p className={styles.formLead}>
                If you have any questions, please feel free to contact us and we will
                respond as quickly as possible
              </p>
            </div>

            <div className={styles.formGrid}>
              <ContactUsForm action="/contact" method="post" delayMs={3000} />
            </div>
          </div>
        </section>
      </main>

      <ICareFooter />
    </>
  );
}
