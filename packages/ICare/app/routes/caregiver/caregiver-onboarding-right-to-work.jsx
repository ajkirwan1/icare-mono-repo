import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { AlertBanner, DashboardShell, PrimaryActionButton, StatusPill } from "~/components/application/kasia";
import styles from "./caregiver-onboarding-right-to-work.module.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function CaregiverOnboardingRightToWork() {
  const [method, setMethod] = useState("passport");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const canSubmit = useMemo(
    () => method === "ukvi" || (confirmed && selectedFileName.length > 0 && !fileError),
    [method, confirmed, selectedFileName, fileError]
  );

  function onFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File is too large. Max allowed size is 5MB.");
      setSelectedFileName("");
      return;
    }

    setFileError("");
    setSelectedFileName(file.name);
  }

  return (
    <DashboardShell>
      <div className={styles.page}>
        <div className={styles.topNav}>
          <NavLink className={styles.backLink} to="/caregiver/onboarding">
            ← Back to Onboarding
          </NavLink>
        </div>

        <header className={styles.header}>
          <h1>Right to Work Verification</h1>
          <p>Confirm you have legal right to work in the UK</p>
          <StatusPill label="Not Submitted" variant="info" />
        </header>

        <AlertBanner
          variant="info"
          title="All caregivers must prove they can legally work in the UK (Immigration Act 2006)"
          icon="i"
          className={styles.legalAlert}
        />

        <section className={styles.section}>
          <h2>Verification Method *</h2>
          <div className={styles.radioGroup} role="radiogroup" aria-label="Verification method">
            <label className={styles.radioOption}>
              <input
                checked={method === "passport"}
                name="verification-method"
                onChange={() => setMethod("passport")}
                type="radio"
              />
              <span>I am a UK passport holder</span>
            </label>
            <label className={styles.radioOption}>
              <input
                checked={method === "ukvi"}
                name="verification-method"
                onChange={() => setMethod("ukvi")}
                type="radio"
              />
              <span>I have a UKVI share code (visa/settled status)</span>
            </label>
          </div>
        </section>

        {method === "passport" ? (
          <>
            <label className={styles.checkboxRow}>
              <input checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} type="checkbox" />
              <span>I confirm I am a UK passport holder</span>
            </label>

            <label className={styles.uploadZone}>
              <input accept=".jpg,.jpeg,.png,.pdf" onChange={onFileChange} type="file" />
              <span className={styles.uploadIcon}>📄</span>
              <span className={styles.uploadText}>Drag and drop your passport photo page, or click to browse</span>
              <span className={styles.uploadSubtext}>JPG, PNG, PDF - Max 5MB</span>
              {selectedFileName ? <span className={styles.fileName}>{selectedFileName}</span> : null}
              {fileError ? <span className={styles.fileError}>{fileError}</span> : null}
            </label>
          </>
        ) : (
          <div className={styles.ukviInfo}>
            You selected UKVI share code verification. You can submit and continue to share-code checks in the next step.
          </div>
        )}

        <div className={styles.actions}>
          <PrimaryActionButton label="Submit for Review" type="button" />
          {!canSubmit ? <p className={styles.hint}>Complete required fields to submit.</p> : null}
        </div>

        <NavLink className={styles.bottomBack} to="/caregiver/onboarding">
          ← Back to Onboarding
        </NavLink>
      </div>
    </DashboardShell>
  );
}
