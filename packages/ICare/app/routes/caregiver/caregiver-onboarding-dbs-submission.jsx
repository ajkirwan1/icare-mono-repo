import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { AlertBanner, DashboardShell, PrimaryActionButton, StatusPill } from "~/components/application/kasia";
import styles from "./caregiver-onboarding-dbs-submission.module.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function CaregiverOnboardingDbsSubmission() {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [status, setStatus] = useState("Not Submitted");

  const canSubmit = useMemo(() => selectedFileName.length > 0 && issueDate.length > 0 && !fileError, [
    selectedFileName,
    issueDate,
    fileError
  ]);

  function onFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setFileError("Invalid format. Please upload JPG, PNG, or PDF.");
      setSelectedFileName("");
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

  function onSubmit() {
    if (!canSubmit) {
      return;
    }
    setStatus("Pending Review");
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
          <h1>DBS Check Submission</h1>
          <p>Upload your DBS certificate to earn the &apos;DBS Verified&apos; badge</p>
          <span className={styles.optionalBadge}>Optional</span>
          <div className={styles.statusRow}>
            <StatusPill label={status} variant="info" />
          </div>
        </header>

        <AlertBanner
          variant="info"
          icon="i"
          title="Stand out to families. DBS-verified caregivers receive more booking requests."
          message="DBS submission is voluntary. You can skip now and submit later."
          className={styles.infoAlert}
        />

        <label className={styles.uploadZone}>
          <input accept=".jpg,.jpeg,.png,.pdf" onChange={onFileChange} type="file" />
          <span className={styles.uploadIcon}>📄</span>
          <span className={styles.uploadText}>Drag and drop your DBS certificate here, or click to browse</span>
          <span className={styles.uploadSubtext}>JPG, PNG, PDF - Max 5MB</span>
          {selectedFileName ? <span className={styles.fileName}>{selectedFileName}</span> : null}
          {fileError ? <span className={styles.fileError}>{fileError}</span> : null}
        </label>

        <section className={styles.fieldSection}>
          <label className={styles.fieldLabel} htmlFor="certificateNumber">
            DBS Certificate Number (optional)
          </label>
          <input
            className={styles.textInput}
            id="certificateNumber"
            name="certificateNumber"
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="Enter certificate number"
            type="text"
            value={certificateNumber}
          />
          <p className={styles.helpText}>Certificate number helps admin verify authenticity (optional)</p>
        </section>

        <section className={styles.fieldSection}>
          <label className={styles.fieldLabel} htmlFor="issueDate">
            Issue Date *
          </label>
          <input
            className={styles.textInput}
            id="issueDate"
            name="issueDate"
            onChange={(e) => setIssueDate(e.target.value)}
            type="date"
            value={issueDate}
          />
          <p className={styles.helpText}>Certificate issue date (recommended: within 3 years)</p>
        </section>

        <div className={styles.actions}>
          <PrimaryActionButton label="Submit for Review" onClick={onSubmit} type="button" />
          <NavLink className={styles.skipButton} to="/caregiver/onboarding">
            Skip for Now
          </NavLink>
          {!canSubmit ? <p className={styles.hint}>Add a file and issue date to submit.</p> : null}
        </div>

        <NavLink className={styles.bottomBack} to="/caregiver/onboarding">
          ← Back to Onboarding
        </NavLink>
      </div>
    </DashboardShell>
  );
}
