import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  DashboardShell,
  SectionCard,
  PrimaryActionButton
} from "~/components/application/kasia";
import CustomSelect from "~/forms/inputs/CustomSelect";
import IntroVideoUploader from "~/components/application/profile/IntroVideoUploader";
import {
  fetchCaregiverProfile,
  saveCaregiverProfile,
  uploadCaregiverProfilePhoto,
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
const languageCatalog = Array.from(new Set([...languages, ...moreLanguages]));
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
const interestCatalog = Array.from(new Set([...interests, ...moreInterests]));
const coreServicesCatalog = [
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
const MAX_PROFILE_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_PROFILE_PHOTO_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
]);
const PROFILE_PHOTO_EXTENSION_TO_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp"
};
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
  const [profileId, setProfileId] = useState("caregiver-sarah-johnson");
  const [visibleLanguages, setVisibleLanguages] = useState(languages);
  const [visibleInterests, setVisibleInterests] = useState(interests);
  const [selected, setSelected] = useState(initialSelected);
  const [languageToAdd, setLanguageToAdd] = useState("");
  const [interestToAdd, setInterestToAdd] = useState("");
  const [selectedCoreServices, setSelectedCoreServices] = useState(coreServicesCatalog);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [otherService, setOtherService] = useState("");
  const [bio, setBio] = useState("Introduce yourself and tell care receivers why you want to work as a caregiver, including your experience, values, and the support you enjoy providing.");
  const [yearsExperience, setYearsExperience] = useState("5");
  const [hourlyRate, setHourlyRate] = useState("18");
  const [postcode, setPostcode] = useState("SW1A 1AA");
  const [travelDistance, setTravelDistance] = useState("10 miles");
  const [profilePhoto, setProfilePhoto] = useState("/images/avatars/female.webp");
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoMimeType, setProfilePhotoMimeType] = useState("");
  const [viewerRole, setViewerRole] = useState("caregiver");
  const [viewerId, setViewerId] = useState("");
  const [introVideo, setIntroVideo] = useState({
    introVideoUrl: null,
    introVideoDurationSec: null
  });
  const [loadingIntroVideo, setLoadingIntroVideo] = useState(true);
  const [savingChanges, setSavingChanges] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("-");

  const addLanguage = (lang) => {
    setVisibleLanguages((prev) => (prev.includes(lang) ? prev : [...prev, lang]));
  };

  const removeLanguage = (lang) => {
    setVisibleLanguages((prev) => prev.filter((x) => x !== lang));
  };

  const addInterest = (interest) => {
    setVisibleInterests((prev) => (prev.includes(interest) ? prev : [...prev, interest]));
  };

  const removeInterest = (interest) => {
    setVisibleInterests((prev) => prev.filter((x) => x !== interest));
  };

  const toggleAdditionalService = (service) => {
    setSelectedAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((x) => x !== service) : [...prev, service]
    );
  };

  const toggleCoreService = (service) => {
    setSelectedCoreServices((prev) =>
      prev.includes(service) ? prev.filter((x) => x !== service) : [...prev, service]
    );
  };

  const openPhotoBrowser = () => {
    fileInputRef.current?.click();
  };

  const resolveUploadedMediaUrl = (value) => {
    const mediaPath = String(value || "").trim();
    if (!mediaPath) {
      return "";
    }

    if (/^https?:\/\//i.test(mediaPath)) {
      return mediaPath;
    }

    const apiBase = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
    if (apiBase) {
      return `${apiBase}${mediaPath.startsWith("/") ? mediaPath : `/${mediaPath}`}`;
    }

    return mediaPath;
  };

  const onPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) { return; }

    const extension = String(file.name || "").split(".").pop()?.trim().toLowerCase() || "";
    const normalizedMimeType = String(file.type || "").trim().toLowerCase();
    const resolvedMimeType = normalizedMimeType || PROFILE_PHOTO_EXTENSION_TO_MIME[extension] || "";

    if (!ALLOWED_PROFILE_PHOTO_MIME_TYPES.has(resolvedMimeType)) {
      setProfilePhotoFile(null);
      setProfilePhotoMimeType("");
      setSaveError("Unsupported image format. Please upload JPG, PNG, or WebP.");
      return;
    }

    if (file.size > MAX_PROFILE_PHOTO_SIZE_BYTES) {
      setProfilePhotoFile(null);
      setProfilePhotoMimeType("");
      setSaveError("Profile photo is too large. Maximum size is 5 MB.");
      return;
    }

    setSaveError("");
    setProfilePhotoFile(file);
    setProfilePhotoMimeType(resolvedMimeType);
    const localUrl = URL.createObjectURL(file);
    setProfilePhoto(localUrl);
  };

  const handleSaveChanges = async () => {
    setSavingChanges(true);
    setSaveError("");
    setSaveMessage("");

    try {
      const actorId = String(viewerId || profileId).trim() || profileId;
      const hasPendingPhotoUpload = Boolean(profilePhotoFile);
      let photoUploadErrorMessage = "";

      const profileData = {
        bio: String(bio || "").trim(),
        yearsExperience: Number(yearsExperience || 0),
        languages: visibleLanguages,
        interests: visibleInterests,
        services: selectedCoreServices,
        additionalServices: selectedAdditionalServices,
        otherService: String(otherService || "").trim(),
        hourlyRate: Number(hourlyRate || 0),
        availability: selected,
        location: {
          postcode: String(postcode || "").trim(),
          travelDistance: String(travelDistance || "").trim()
        }
      };

      const saved = await saveCaregiverProfile({
        profileId,
        userRole: viewerRole,
        userId: actorId,
        profileData
      });

      if (hasPendingPhotoUpload && profilePhotoFile) {
        try {
          const photoPayload = await uploadCaregiverProfilePhoto({
            profileId,
            userRole: viewerRole,
            userId: actorId,
            file: profilePhotoFile,
            mimeType: profilePhotoMimeType
          });

          const uploadedPhotoUrl = photoPayload?.profile?.profilePhotoUrl || "";
          if (uploadedPhotoUrl) {
            setProfilePhoto(resolveUploadedMediaUrl(uploadedPhotoUrl));
          }
          setProfilePhotoFile(null);
          setProfilePhotoMimeType("");
        } catch (photoError) {
          photoUploadErrorMessage = photoError instanceof Error
            ? photoError.message
            : "Photo upload failed. Please try again.";
        }
      }

      const savedPhotoUrl = saved?.profile?.profilePhotoUrl || "";
      if (savedPhotoUrl && !hasPendingPhotoUpload) {
        setProfilePhoto(resolveUploadedMediaUrl(savedPhotoUrl));
      }

      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      setLastSavedAt(`Today at ${formatted}`);

      if (photoUploadErrorMessage) {
        setSaveError(`Profile details were saved, but photo was not uploaded. ${photoUploadErrorMessage}`);
        setSaveMessage("Profile details saved.");
        setTimeout(() => setSaveMessage(""), 3200);
      } else {
        setSaveMessage("Changes saved successfully.");
        setTimeout(() => setSaveMessage(""), 2400);
      }
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save profile changes.");
    } finally {
      setSavingChanges(false);
    }
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
  const availableLanguageOptions = languageCatalog
    .filter((lang) => !visibleLanguages.includes(lang))
    .map((lang) => ({ value: lang, label: lang }));
  const availableInterestOptions = interestCatalog
    .filter((interest) => !visibleInterests.includes(interest))
    .map((interest) => ({ value: interest, label: interest }));

  useEffect(() => {
    try {
      const rawUser = window.localStorage.getItem("icare_user");
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      const nextRole = String(parsedUser?.userType || "").trim().toLowerCase();
      const nextId = String(parsedUser?.id || "").trim();

      if (nextRole === "admin" || nextRole === "caregiver") {
        setViewerRole(nextRole);
      }

      if (nextId) {
        setViewerId(nextId);
        setProfileId(nextId);
      }
    } catch {
      // Keep default local profile id and role in development fallback mode.
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

        const profile = data?.profile || {};
        const profileData = profile?.profileData && typeof profile.profileData === "object"
          ? profile.profileData
          : {};

        if (profile?.profilePhotoUrl) {
          setProfilePhoto(resolveUploadedMediaUrl(profile.profilePhotoUrl));
        }

        if (typeof profileData.bio === "string") {
          setBio(profileData.bio);
        }
        if (profileData.yearsExperience !== undefined) {
          setYearsExperience(String(profileData.yearsExperience));
        }
        if (Array.isArray(profileData.languages)) {
          setVisibleLanguages(profileData.languages.filter((item) => typeof item === "string"));
        }
        if (Array.isArray(profileData.interests)) {
          setVisibleInterests(profileData.interests.filter((item) => typeof item === "string"));
        }
        if (Array.isArray(profileData.services)) {
          setSelectedCoreServices(
            profileData.services.filter((item) => coreServicesCatalog.includes(item))
          );
        }
        if (Array.isArray(profileData.additionalServices)) {
          setSelectedAdditionalServices(profileData.additionalServices.filter((item) => typeof item === "string"));
        }
        if (typeof profileData.otherService === "string") {
          setOtherService(profileData.otherService);
        }
        if (profileData.hourlyRate !== undefined) {
          setHourlyRate(String(profileData.hourlyRate));
        }
        if (profileData.availability && typeof profileData.availability === "object") {
          setSelected(profileData.availability);
        }
        if (profileData.location && typeof profileData.location === "object") {
          if (typeof profileData.location.postcode === "string") {
            setPostcode(profileData.location.postcode);
          }
          if (typeof profileData.location.travelDistance === "string") {
            setTravelDistance(profileData.location.travelDistance);
          }
        }

        setIntroVideo({
          introVideoUrl: profile?.introVideoUrl || null,
          introVideoDurationSec: profile?.introVideoDurationSec ?? null
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
    const actorId = String(viewerId || profileId).trim() || profileId;
    const data = await uploadCaregiverIntroVideo({
      profileId,
      userRole: viewerRole,
      userId: actorId,
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
    const actorId = String(viewerId || profileId).trim() || profileId;
    const data = await removeCaregiverIntroVideo({
      profileId,
      userRole: viewerRole,
      userId: actorId
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
                  <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
                </label>

                <label className={styles.field}>
                  <span>Years of experience in care *</span>
                  <input value={yearsExperience} onChange={(event) => setYearsExperience(event.target.value)} />
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
                    <label id="language-select-label" className={styles.chipPickerLabel} htmlFor="language-select">Add</label>
                    <CustomSelect
                      id="language-select"
                      name="language-select"
                      labelId="language-select-label"
                      className={styles.chipSelect}
                      controlClassName={styles.chipSelectControl}
                      value={languageToAdd}
                      placeholder={availableLanguageOptions.length ? "Select language" : "No more languages"}
                      disabled={!availableLanguageOptions.length}
                      onChange={(value) => {
                        if (!value) {
                          return;
                        }
                        addLanguage(value);
                        setLanguageToAdd("");
                      }}
                      options={availableLanguageOptions}
                    />
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
                    <label id="interest-select-label" className={styles.chipPickerLabel} htmlFor="interest-select">Add</label>
                    <CustomSelect
                      id="interest-select"
                      name="interest-select"
                      labelId="interest-select-label"
                      className={styles.chipSelect}
                      controlClassName={styles.chipSelectControl}
                      value={interestToAdd}
                      placeholder={availableInterestOptions.length ? "Select interest" : "No more interests"}
                      disabled={!availableInterestOptions.length}
                      onChange={(value) => {
                        if (!value) {
                          return;
                        }
                        addInterest(value);
                        setInterestToAdd("");
                      }}
                      options={availableInterestOptions}
                    />
                  </div>
                  <small>Care receivers often look for shared interests. Select hobbies you enjoy.</small>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Services You Offer">
              <p className={styles.subSectionTitle}>Core Services You Offer</p>
              <div className={styles.additionalServices}>
                {coreServicesCatalog.map((service) => {
                  const isChecked = selectedCoreServices.includes(service);
                  return (
                    <label key={service} className={styles.checkRow}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCoreService(service)}
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>

              <p className={`${styles.subSectionTitle} ${styles.additionalTitle}`}>Additional Services (optional)</p>
              <div className={styles.additionalServices}>
                {additionalServices.map((service) => {
                  const isChecked = selectedAdditionalServices.includes(service);
                  return (
                    <label key={service} className={styles.checkRow}>
                      <input
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
                  <input value={hourlyRate} onChange={(event) => setHourlyRate(event.target.value)} />
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
                  <input value={postcode} onChange={(event) => setPostcode(event.target.value)} />
                  <small>Used to show you to care receivers in your area</small>
                </label>

                <label className={styles.field}>
                  <span>Travel distance</span>
                  <select value={travelDistance} onChange={(event) => setTravelDistance(event.target.value)}>
                    <option>5 miles</option>
                    <option>10 miles</option>
                    <option>15 miles</option>
                    <option>20 miles</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <div className={styles.actionsFooter}>
              <PrimaryActionButton label={savingChanges ? "Saving..." : "Save Changes"} onClick={handleSaveChanges} disabled={savingChanges} />
              <button type="button" className={styles.secondaryBtn} onClick={() => navigate(0)}>Discard Changes</button>
              <p>Last saved: {lastSavedAt}</p>
              {saveError ? <p className={styles.saveFeedback}>{saveError}</p> : null}
              {saveMessage ? <p className={styles.saveFeedback}>{saveMessage}</p> : null}
            </div>
          </>
        )}
        aside={null}
      />
    </div>
  );
}
