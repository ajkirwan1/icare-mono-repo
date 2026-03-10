import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { AlertBanner, DashboardShell, PrimaryActionButton, StatusPill } from "~/components/application/kasia";
import {
    getCaregiverOnboardingSummary,
    onboardingStatusLabel,
    submitCaregiverDbs
} from "./caregiver-onboarding-api-client";
import styles from "./caregiver-onboarding-dbs-submission.module.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function CaregiverOnboardingDbsSubmission() {
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedFileSize, setSelectedFileSize] = useState(0);
    const [fileError, setFileError] = useState("");
    const [certificateNumber, setCertificateNumber] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [status, setStatus] = useState("not_submitted");
    const [submitBusy, setSubmitBusy] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadSummary() {
            try {
                const payload = await getCaregiverOnboardingSummary({ signal: controller.signal });
                const dbs = payload?.dbs || {};

                setStatus(String(dbs.status || "not_submitted"));
                setCertificateNumber(String(dbs.certificateNumber || ""));
                setIssueDate(String(dbs.issueDate || ""));
                setSelectedFileName(String(dbs.fileName || ""));
                setSelectedFileSize(Number(dbs.fileSize || 0));
            } catch {
                // Keep default state if API fails.
            }
        }

        loadSummary();

        return () => {
            controller.abort();
        };
    }, []);

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
            setSelectedFileSize(0);
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFileError("File is too large. Max allowed size is 5MB.");
            setSelectedFileName("");
            setSelectedFileSize(0);
            return;
        }

        setFileError("");
        setSelectedFileName(file.name);
        setSelectedFileSize(file.size);
    }

    async function onSubmit() {
        if (!canSubmit || submitBusy) {
            return;
        }

        setSubmitBusy(true);
        setSubmitError("");

        try {
            const response = await submitCaregiverDbs({
                fileName: selectedFileName,
                fileSize: selectedFileSize,
                certificateNumber,
                issueDate
            });

            setStatus(String(response?.dbs?.status || "pending_review"));
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Could not submit DBS verification.");
        } finally {
            setSubmitBusy(false);
        }
    }

    return (
        <DashboardShell fullWidth>
            <div className={styles.page}>
                <div className={styles.topNav}>
                    <NavLink className={styles.backLink} to="/caregiver/onboarding">
                        Back to Onboarding
                    </NavLink>
                </div>

                <header className={styles.header}>
                    <h1>DBS Check Submission</h1>
                    <p>Upload your DBS certificate to earn the 'DBS Verified' badge</p>
                    <span className={styles.optionalBadge}>Optional</span>
                    <div className={styles.statusRow}>
                        <StatusPill label={onboardingStatusLabel(status)} variant="info" />
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
                    <span className={styles.uploadIcon}>[file]</span>
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
                    <PrimaryActionButton label={submitBusy ? "Submitting..." : "Submit for Review"} onClick={onSubmit} type="button" />
                    <NavLink className={styles.skipButton} to="/caregiver/onboarding">
                        Skip for Now
                    </NavLink>
                    {!canSubmit ? <p className={styles.hint}>Add a file and issue date to submit.</p> : null}
                    {submitError ? <p className={styles.hint} role="alert">{submitError}</p> : null}
                </div>

                <NavLink className={styles.bottomBack} to="/caregiver/onboarding">
                    Back to Onboarding
                </NavLink>
            </div>
        </DashboardShell>
    );
}
