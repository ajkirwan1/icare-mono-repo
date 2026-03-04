import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { DashboardShell, SectionCard } from "~/components/application/kasia";
import { fetchCaregiverProfile } from "~/utils/api/caregiver-intro-video";
import styles from "./caregiver-profile-preview.module.scss";

const services = [
  "Companionship (conversation, activities, outings)",
  "Light housework and cleaning",
  "Shopping and errands",
  "Meal preparation (no feeding assistance)",
  "Transportation (requires own vehicle)",
  "Own vehicle (insured for passenger transport)"
];

export default function CaregiverProfilePreview() {
  const profileId = "caregiver-sarah-johnson";
  const [profile, setProfile] = useState({
    id: profileId,
    introVideoUrl: null,
    introVideoDurationSec: null,
    introVideoMime: null,
    introVideoSizeBytes: null
  });
  const [loadingVideo, setLoadingVideo] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setLoadingVideo(true);
      try {
        const data = await fetchCaregiverProfile(profileId);
        if (!isMounted) {
          return;
        }
        setProfile((prev) => ({
          ...prev,
          ...data?.profile
        }));
      } catch {
        // Keep UI functional even if API is temporarily unavailable.
      } finally {
        if (isMounted) {
          setLoadingVideo(false);
        }
      }
    }

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [profileId]);

  const showIntroVideoSection = Boolean(profile.introVideoUrl);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>My Profile <span>&gt;</span> <strong>Public Preview</strong></div>

      <DashboardShell
        title={null}
        subtitle={null}
        main={(
          <div className={styles.previewFrame}>
            <header className={styles.pageHeader}>
              <h1>Public Profile Preview</h1>
              <p>This is how families will see your profile.</p>
            </header>

            <div className={styles.sectionStack}>
              <SectionCard title="Caregiver Overview" className={styles.previewCard}>
                <div className={styles.heroGrid}>
                  <div className={styles.hero}>
                    <img src="/images/avatars/female.webp" alt="Profile" />
                    <div>
                      <h3>Sarah Johnson</h3>
                      <p>5 years experience • SW1A area • £18/hour</p>
                      <div className={styles.verifyBadges}>
                        <span>DBS Verified</span>
                        <span>ID Verified</span>
                        <span>References Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.heroStats}>
                    <div>
                      <small>Availability</small>
                      <p>Weekdays</p>
                    </div>
                    <div>
                      <small>Response time</small>
                      <p>Within 24h</p>
                    </div>
                    <div>
                      <small>Travel range</small>
                      <p>10 miles</p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="About" className={styles.previewCard}>
                <p className={styles.copy}>
                  I am a friendly and experienced companion who enjoys meaningful conversations,
                  gentle outings, and helping with day-to-day routines.
                </p>
              </SectionCard>

              <SectionCard title="Languages & Interests" className={styles.previewCard}>
                <div className={styles.tagBlocks}>
                  <div>
                    <p className={styles.blockLabel}>Languages</p>
                    <div className={styles.tags}>
                      <span>English</span>
                      <span>Polish</span>
                    </div>
                  </div>
                  <div>
                    <p className={styles.blockLabel}>Interests</p>
                    <div className={styles.tags}>
                      <span>Gardening</span>
                      <span>Reading</span>
                      <span>Walking</span>
                      <span>Cooking</span>
                      <span>Board games</span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Services Offered" className={styles.previewCard}>
                <ul className={styles.serviceList}>
                  {services.map((item) => (
                    <li key={item}>
                      <span className={styles.check} aria-hidden="true">v</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              {showIntroVideoSection ? (
                <SectionCard title="Intro video" className={styles.previewCard}>
                  {loadingVideo ? (
                    <p className={styles.copy}>Loading intro video...</p>
                  ) : (
                    <div className={styles.videoPreview}>
                      <video
                        src={profile.introVideoUrl}
                        controls
                        preload="metadata"
                        poster="/images/avatars/female.webp"
                      />
                    </div>
                  )}
                </SectionCard>
              ) : null}
            </div>

            <div className={styles.footerActions}>
              <NavLink to="/caregiver/profile" className={styles.editBtn}>Back to Edit Profile</NavLink>
            </div>
          </div>
        )}
        aside={null}
      />
    </div>
  );
}
