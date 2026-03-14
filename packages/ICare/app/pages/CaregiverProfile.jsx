import { Link } from "react-router";
import ICareFooter from "../components/website/pages/shared/footers/icare-footer";
import ICareAppNavbar from "../components/website/pages/shared/icare-navbar";
import styles from "./caregiver-profile.module.scss";

const ICARE_WHATSAPP_NUMBER = "447448016876";

function formatBoolean(value) {
  return value ? "Yes" : "No";
}

export default function CaregiverProfile({ caregiver }) {
  const whatsappMessage = `Hi ICare, I'm interested in ${caregiver.name} and would like to ask about availability.`;
  const whatsappHref = `https://wa.me/${ICARE_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <ICareAppNavbar />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.topBar}>
            <Link className={styles.backButton} to="/caregivers">
              <span aria-hidden="true" className={styles.backArrow}>←</span>
              Back to caregivers
            </Link>
          </div>

          <div className={styles.heroInner}>
            <div className={styles.imagePanel}>
              <img
                className={styles.photo}
                src={caregiver.photoUrl}
                alt={caregiver.photoAlt}
                style={{ objectPosition: caregiver.photoPosition }}
              />
            </div>

            <div className={styles.copyPanel}>
              {caregiver.location ? <p className={styles.location}>{caregiver.location}</p> : null}
              <h1 className={styles.name}>{caregiver.name}</h1>
              <p className={styles.intro}>{caregiver.shortBio}</p>

              <div className={styles.highlights}>
                <div>
                  <span>Availability</span>
                  <strong>{caregiver.availability}</strong>
                </div>
                <div>
                  <span>Type of support</span>
                  <strong>{caregiver.workType}</strong>
                </div>
                <div>
                  <span>Experience</span>
                  <strong>
                    {caregiver.experienceYears ? `${caregiver.experienceYears}+ years` : "Experienced caregiver"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.layout}>
            <article className={styles.primaryCard}>
              <div className={styles.sectionBlock}>
                <h2>About</h2>
                <p>{caregiver.fullBio}</p>
              </div>

              <div className={styles.sectionBlock}>
                <h2>Experience</h2>
                <ul className={styles.tagList}>
                  {caregiver.careTypes.map((careType) => (
                    <li key={careType}>{careType}</li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className={styles.sidebarCard}>
              <h2>Practical details</h2>

              <dl className={styles.detailsList}>
                <div>
                  <dt>Languages</dt>
                  <dd>{caregiver.languages.length ? caregiver.languages.join(", ") : "Please ask"}</dd>
                </div>
                <div>
                  <dt>Driving licence</dt>
                  <dd>{formatBoolean(caregiver.hasDrivingLicence)}</dd>
                </div>
                <div>
                  <dt>Has car</dt>
                  <dd>{formatBoolean(caregiver.hasCar)}</dd>
                </div>
                <div>
                  <dt>DBS checked</dt>
                  <dd>{caregiver.dbsStatus}</dd>
                </div>
                <div>
                  <dt>References</dt>
                  <dd>{formatBoolean(caregiver.referencesAvailable)}</dd>
                </div>
                <div>
                  <dt>Areas covered</dt>
                  <dd>{caregiver.areasCovered.length ? caregiver.areasCovered.join(", ") : caregiver.location}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.ctaEyebrow}>Next step</p>
              <h2>Interested in this caregiver?</h2>
              <p>If you feel this caregiver could be a good match, you can send a short enquiry to ask about availability and next steps.</p>
            </div>

            <a
              className={styles.ctaButton}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Ask about availability
            </a>
          </div>
        </section>
      </main>

      <ICareFooter />
    </>
  );
}
