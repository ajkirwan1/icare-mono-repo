import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AlertBanner, DashboardShell, PrimaryActionButton, StatusPill } from "~/components/application/kasia";
import {
    getCaregiverOnboardingSummary,
    onboardingStatusLabel,
    submitCaregiverIdentityVerification
} from "./caregiver-onboarding-api-client";
import styles from "./caregiver-onboarding-identity-verification.module.scss";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DOCUMENT_TYPE_OPTIONS = [
    { value: "uk_passport", label: "UK Passport" },
    { value: "driving_licence", label: "Driving Licence" },
    { value: "residence_permit", label: "Biometric Residence Permit" },
    { value: "other", label: "Other Government ID" }
];

export default function CaregiverOnboardingIdentityVerification() {
    const navigate = useNavigate();

    const [documentType, setDocumentType] = useState("uk_passport");
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedFileSize, setSelectedFileSize] = useState(0);
    const [fileError, setFileError] = useState("");
    const [status, setStatus] = useState("not_submitted");
    const [loading, setLoading] = useState(true);
    const [submitBusy, setSubmitBusy] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadSummary() {
            setLoading(true);
            try {
                const data = await getCaregiverOnboardingSummary({ signal: controller.signal });
                const identity = data?.identity || {};

                setStatus(String(identity.status || "not_submitted"));
                setDocumentType(String(identity.documentType || "uk_passport"));
                setSelectedFileName(String(identity.fileName || ""));
                setSelectedFileSize(Number(identity.fileSize || 0));
            } catch {
                // Keep default values if API is unavailable.
            } finally {
                setLoading(false);
            }
        }

        loadSummary();

        return () => {
            controller.abort();
        };
    }, []);

    const canSubmit = useMemo(() => {
        return selectedFileName.length > 0 && !fileError && !submitBusy;
    }, [selectedFileName, fileError, submitBusy]);

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
        if (!canSubmit) {
            return;
        }

        setSubmitBusy(true);
        setSubmitError("");

        try {
            const response = await submitCaregiverIdentityVerification({
                documentType,
                fileName: selectedFileName,
                fileSize: selectedFileSize
            });

            setStatus(String(response?.identity?.status || "pending_review"));
            navigate("/caregiver/onboarding");
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Could not submit identity verification.");
        } finally {
            setSubmitBusy(false);
        }
    }

    return (
        <DashboardShell>
            <div className={styles.page}>
                <div className={styles.topNav}>
                    <NavLink className={styles.backLink} to="/caregiver/onboarding">
                        Back to Onboarding
                    </NavLink>
                </div>

                <header className={styles.header}>
                    <h1>Identity Verification</h1>
                    <p>Upload a government-issued ID to verify your identity</p>
                    <StatusPill label={onboardingStatusLabel(status)} variant="info" />
                </header>

                <AlertBanner
                    className={styles.infoAlert}
                    icon="i"
                    message="Upload a clear photo of your passport photo page or driving licence (front)."
                    title="Identity checks keep families and caregivers safe."
                    variant="info"
                />

                <section className={styles.section}>
                    <label className={styles.fieldLabel} htmlFor="identity-document-type">Document type</label>
                    <select
                        className={styles.selectField}
                        id="identity-document-type"
                        name="documentType"
                        onChange={(event) => setDocumentType(event.target.value)}
                        value={documentType}
                    >
                        {DOCUMENT_TYPE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </section>

                <label className={styles.uploadZone}>
                    <input accept=".jpg,.jpeg,.png,.pdf" onChange={onFileChange} type="file" />
                    <span className={styles.uploadIcon} aria-hidden="true">[file]</span>
                    <span className={styles.uploadText}>Drag and drop your file here, or click to browse</span>
                    <span className={styles.uploadSubtext}>JPG, PNG, PDF - Max 5MB</span>
                    {selectedFileName ? <span className={styles.fileName}>{selectedFileName}</span> : null}
                    {fileError ? <span className={styles.fileError}>{fileError}</span> : null}
                </label>

                <div className={styles.actions}>
                    <PrimaryActionButton
                        disabled={!canSubmit}
                        label={submitBusy ? "Submitting..." : "Submit for Review"}
                        onClick={onSubmit}
                        type="button"
                    />
                    {!loading && !canSubmit ? <p className={styles.hint}>Upload a valid file to submit.</p> : null}
                    {submitError ? <p className={styles.submitError}>{submitError}</p> : null}
                </div>

                <NavLink className={styles.bottomBack} to="/caregiver/onboarding">
                    Back to Onboarding
                </NavLink>
            </div>
        </DashboardShell>
    );
}
