import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  DashboardShell,
  SectionCard,
  PrimaryActionButton
} from "~/components/application/kasia";
import IntroVideoUploader from "~/components/application/profile/IntroVideoUploader";
import {
  fetchCaregiverProfile,
  removeCaregiverIntroVideo,
  uploadCaregiverIntroVideo
} from "~/utils/api/caregiver-intro-video";
import styles from "./caregiver-profile-edit.module.scss";

const languages = ["English", "Polish"];
const moreLanguages = [
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Romanian",
  "Ukrainian",
  "Polish",
  "Arabic",
  "Hindi",
  "Urdu",
  "Bengali",
  "Turkish",
  "Mandarin Chinese",
  "Russian"
];
const interests = ["Gardening", "Reading", "Walking", "Cooking", "Board games"];
const moreInterests = [
  "Music",
  "Arts and crafts",
  "Knitting",
  "Baking",
  "Movies",
  "TV shows",
  "Puzzles",
  "Crosswords",
  "Chess",
  "Card games",
  "Painting",
  "Photography",
  "Yoga",
  "Meditation",
  "Swimming",
  "Dancing",
  "Nature walks",
  "Birdwatching",
  "Writing",
  "Volunteering"
];
const services = [
  "Companionship (conversation, activities, outings)",
  "Light housework and cleaning",
  "Shopping and errands",
  "Meal preparation (no feeding assistance)",
  "Transportation (requires own vehicle)",
  "I have my own vehicle (insured for passenger transport)"
];
const additionalServices = [
  "Medication reminders (non-clinical)",
  "Accompaniment to appointments",
  "Overnight companionship",
  "Pet care support",
  "Light admin help (letters, forms)"
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["Morning", "Afternoon", "Evening"];
const initialSelected = {
  Monday: ["Morning", "Afternoon"],
  Tuesday: ["Morning", "Afternoon"],
  Wednesday: ["Afternoon"],
  Thursday: ["Morning", "Afternoon"],
  Friday: ["Morning"]
};

export default function CaregiverProfileEdit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const profileId = "caregiver-sarah-johnson";
  const [visibleLanguages, setVisibleLanguages] = useState(languages);
  const [visibleInterests, setVisibleInterests] = useState(interests);
  const [selected, setSelected] = useState(initialSelected);
  const [languageToAdd, setLanguageToAdd] = useState("");
  const [interestToAdd, setInterestToAdd] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [otherService, setOtherService] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("/images/avatars/female.webp");
  const [viewerRole, setViewerRole] = useState("caregiver");
  const [introVideo, setIntroVideo] = useState({
    introVideoUrl: null,
    introVideoDurationSec: null
  });
  const [loadingIntroVideo, setLoadingIntroVideo] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("Today at 2:15 PM");

  const addLanguage = (lang) => {
    setVisibleLanguages((prev) => (prev.includes(lang) ? prev : [...prev, lang]));
  };

  const removeLanguage = (lang) => {
    setVisibleLanguages((prev) => prev.filter((x) => x !== lang));
  };

  const addFirstAvailableLanguage = () => {
    const next = moreLanguages.find((lang) => !visibleLanguages.includes(lang));
    if (next) { addLanguage(next); }
  };

  const addCustomLanguage = () => {
    const trimmed = customLanguage.trim();
    if (!trimmed) { return; }
    addLanguage(trimmed);
    setCustomLanguage("");
  };

  const addInterest = (interest) => {
    setVisibleInterests((prev) => (prev.includes(interest) ? prev : [...prev, interest]));
  };

  const removeInterest = (interest) => {
    setVisibleInterests((prev) => prev.filter((x) => x !== interest));
  };

  const addFirstAvailableInterest = () => {
    const next = moreInterests.find((interest) => !visibleInterests.includes(interest));
    if (next) { addInterest(next); }
  };

  const addCustomInterest = () => {
    const trimmed = customInterest.trim();
    if (!trimmed) { return; }
    addInterest(trimmed);
    setCustomInterest("");
  };

  const toggleAdditionalService = (service) => {
    setSelectedAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((x) => x !== service) : [...prev, service]
    );
  };

  const openPhotoBrowser = () => {
    fileInputRef.current?.click();
  };

  const onPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) { return; }
    const localUrl = URL.createObjectURL(file);
    setProfilePhoto(localUrl);
  };

  const handleSaveChanges = () => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setLastSavedAt(`Today at ${formatted}`);
    setSaveMessage("Changes saved successfully.");
    setTimeout(() => setSaveMessage(""), 2400);
  };

  const toggleSlot = (day, slot) => {
    setSelected((prev) => {
      const daySlots = new Set(prev[day] || []);
      if (daySlots.has(slot)) {
        daySlots.delete(slot);
      } else {
        daySlots.add(slot);
      }
      return { ...prev, [day]: [...daySlots] };
    });
  };

  const setWeekdays = () => {
    setSelected({
      Monday: [...slots],
      Tuesday: [...slots],
      Wednesday: [...slots],
      Thursday: [...slots],
      Friday: [...slots]
    });
  };

  const setAllDays = () => {
    setSelected(
      days.reduce((acc, day) => {
        acc[day] = [...slots];
        return acc;
      }, {})
    );
  };

  const clearAll = () => setSelected({});

  useEffect(() => {
    const role = window.localStorage.getItem("icare_user_role");
    if (role === "admin" || role === "caregiver") {
      setViewerRole(role);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadIntroVideo() {
      setLoadingIntroVideo(true);
      try {
        const data = await fetchCaregiverProfile(profileId);
        if (!isMounted) {
          return;
        }
        setIntroVideo({
          introVideoUrl: data?.profile?.introVideoUrl || null,
          introVideoDurationSec: data?.profile?.introVideoDurationSec ?? null
        });
      } catch {
        // Keep edit form usable even when profile media API is temporarily unavailable.
      } finally {
        if (isMounted) {
          setLoadingIntroVideo(false);
        }
      }
    }

    loadIntroVideo();
    return () => {
      isMounted = false;
    };
  }, [profileId]);

  async function handleUploadIntroVideo(file, durationSec, onProgress) {
    const data = await uploadCaregiverIntroVideo({
      profileId,
      userRole: viewerRole,
      userId: profileId,
      file,
      durationSec,
      onProgress
    });

    setIntroVideo({
      introVideoUrl: data?.profile?.introVideoUrl || null,
      introVideoDurationSec: data?.profile?.introVideoDurationSec ?? null
    });
  }

  async function handleRemoveIntroVideo() {
    const data = await removeCaregiverIntroVideo({
      profileId,
      userRole: viewerRole,
      userId: profileId
    });

    setIntroVideo({
      introVideoUrl: data?.profile?.introVideoUrl || null,
      introVideoDurationSec: data?.profile?.introVideoDurationSec ?? null
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>Dashboard <span>&gt;</span> <strong>My Profile</strong></div>

      <DashboardShell
        title="Edit Your Profile"
        subtitle="Update your profile information. Changes are visible to care receivers browsing your profile."
        main={(
          <>
            <div className={styles.previewRow}>
              <PrimaryActionButton
                label="Preview Public Profile"
                onClick={() => navigate("/caregiver/profile/preview")}
                className={styles.previewProfileBtn}
              />
            </div>

            <SectionCard title="Profile Photo">
              <div className={styles.photoUpload}>
                <button type="button" className={styles.uploadCircle} onClick={openPhotoBrowser}>
                  <img src={profilePhoto} alt="Profile avatar preview" />
                  <span className={styles.plusBadge}>+</span>
                </button>
                <input
                  ref={fileInputRef}
                  className={styles.hiddenFileInput}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={onPhotoChange}
                />
                <p className={styles.uploadCaption}>Click to upload or replace profile photo</p>
                <p>JPG, PNG - Max 5MB</p>
              </div>
            </SectionCard>

            <SectionCard title="Intro video (optional)">
              {loadingIntroVideo ? (
                <p>Loading intro video...</p>
              ) : (
                <IntroVideoUploader
                  canEdit
                  introVideoUrl={introVideo.introVideoUrl}
                  introVideoDurationSec={introVideo.introVideoDurationSec}
                  onUpload={handleUploadIntroVideo}
                  onRemove={handleRemoveIntroVideo}
                />
              )}
            </SectionCard>

            <SectionCard title="About You">
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Bio *</span>
                  <textarea defaultValue="Introduce yourself and tell care receivers why you want to work as a caregiver, including your experience, values, and the support you enjoy providing." />
                </label>

                <label className={styles.field}>
                  <span>Years of experience in care *</span>
                  <input defaultValue="5" />
                  <small>How many years have you been providing care or companionship?</small>
                </label>

                <div className={styles.field}>
                  <span>Languages spoken</span>
                  <div className={styles.chipsWrap}>
                    {visibleLanguages.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.chip}
                        onClick={() => removeLanguage(item)}
                        aria-label={`Remove ${item}`}
                      >
                        {item} <em>x</em>
                      </button>
                    ))}
                    <button type="button" className={styles.addChip} onClick={addFirstAvailableLanguage}>+ Add</button>
                    <div className={styles.languageDropdown}>
                      <select
                        value={languageToAdd}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            addLanguage(value);
                            setLanguageToAdd("");
                          }
                        }}
                      >
                        <option value="">Find more languages</option>
                        {moreLanguages
                          .filter((lang) => !visibleLanguages.includes(lang))
                          .map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.customEntry}>
                      <input
                        type="text"
                        value={customLanguage}
                        onChange={(e) => setCustomLanguage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomLanguage())}
                        placeholder="Type your own language"
                      />
                      <button type="button" onClick={addCustomLanguage}>Add</button>
                    </div>
                  </div>
                  <small>Select all languages you can communicate in</small>
                </div>

                <div className={styles.field}>
                  <span>Interests and hobbies</span>
                  <div className={styles.chipsWrap}>
                    {visibleInterests.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={styles.chip}
                        onClick={() => removeInterest(item)}
                      >
                        {item} <em>x</em>
                      </button>
                    ))}
                    <button type="button" className={styles.addChip} onClick={addFirstAvailableInterest}>+ Add</button>
                    <div className={styles.interestDropdown}>
                      <select
                        value={interestToAdd}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value) {
                            addInterest(value);
                            setInterestToAdd("");
                          }
                        }}
                      >
                        <option value="">Find more interests</option>
                        {moreInterests
                          .filter((interest) => !visibleInterests.includes(interest))
                          .map((interest) => (
                            <option key={interest} value={interest}>{interest}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.customEntry}>
                      <input
                        type="text"
                        value={customInterest}
                        onChange={(e) => setCustomInterest(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
                        placeholder="Type your own interest"
                      />
                      <button type="button" onClick={addCustomInterest}>Add</button>
                    </div>
                  </div>
                  <small>Care receivers often look for shared interests. Select hobbies you enjoy.</small>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Services You Offer">
              <p className={styles.subSectionTitle}>Core Services You Offer</p>
              <ul className={styles.serviceList}>
                {services.map((item) => (
                  <li key={item}>
                    <span className={styles.serviceTick} aria-hidden="true">v</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className={`${styles.subSectionTitle} ${styles.additionalTitle}`}>Additional Services (optional)</p>
              <div className={styles.additionalServices}>
                {additionalServices.map((service) => {
                  const isChecked = selectedAdditionalServices.includes(service);
                  return (
                    <label key={service} className={styles.checkRow}>
                      <input
                        className={styles.additionalCheck}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAdditionalService(service)}
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>

              <label className={styles.field}>
                <span>Other service</span>
                <input
                  value={otherService}
                  onChange={(e) => setOtherService(e.target.value)}
                  placeholder="Add another service you can provide"
                />
              </label>

              <p className={styles.safetyNote}>
                Personal care and medical tasks are not included in this category.
              </p>
            </SectionCard>

            <SectionCard title="Hourly Rate">
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Your hourly rate *</span>
                  <input defaultValue="18" />
                  <small className={styles.rateNote}>Rate must be between £10 and £100 per hour</small>
                </label>
              </div>
              <div className={styles.infoBox}>
                At GBP 18/hour, you earn GBP 15.30 per hour after commission. Typical companionship rates in your area are GBP 16-22/hour.
              </div>
            </SectionCard>

            <SectionCard title="Availability">
              <p className={styles.sectionHelp}>Set your recurring weekly schedule. You can update this anytime.</p>
              <div className={styles.calendarActions}>
                <button type="button" onClick={setWeekdays}>Weekdays</button>
                <button type="button" onClick={setAllDays}>All Days</button>
                <button type="button" onClick={clearAll}>Clear</button>
              </div>
              <div className={styles.availabilityTable}>
                <div className={styles.avHead}>
                  <span />
                  {slots.map((slot) => <span key={slot}>{slot}</span>)}
                </div>
                {days.map((day) => (
                  <div className={styles.avRow} key={day}>
                    <span>{day}</span>
                    {slots.map((slot) => {
                      const on = selected[day]?.includes(slot);
                      return (
                        <button
                          key={`${day}-${slot}`}
                          type="button"
                          aria-pressed={on}
                          className={`${styles.slotBtn} ${on ? styles.slotOn : ""}`}
                          onClick={() => toggleSlot(day, slot)}
                        >
                          {on ? "v" : ""}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Location & Travel">
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Postcode *</span>
                  <input defaultValue="SW1A 1AA" />
                  <small>Used to show you to care receivers in your area</small>
                </label>

                <label className={styles.field}>
                  <span>Travel distance</span>
                  <select defaultValue="10 miles">
                    <option>5 miles</option>
                    <option>10 miles</option>
                    <option>15 miles</option>
                    <option>20 miles</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <div className={styles.actionsFooter}>
              <PrimaryActionButton label="Save Changes" onClick={handleSaveChanges} />
              <button type="button" className={styles.secondaryBtn} onClick={() => navigate(0)}>Discard Changes</button>
              <p>Last saved: {lastSavedAt}</p>
              {saveMessage ? <p className={styles.saveFeedback}>{saveMessage}</p> : null}
            </div>
          </>
        )}
        aside={null}
      />
    </div>
  );
}
