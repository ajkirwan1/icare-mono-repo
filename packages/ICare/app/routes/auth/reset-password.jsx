import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import styles from "./login.module.scss";

const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function meta() {
    return [
        { title: "ICare | Reset Password" },
        { name: "description", content: "Set a new password for your ICare account." }
    ];
}

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const tokenFromQuery = useMemo(() => searchParams.get("token") || "", [searchParams]);
    const [token, setToken] = useState(tokenFromQuery);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!token || token.length < 20) {
            setError("Reset token is required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords must match.");
            return;
        }
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    token: String(token || "").trim(),
                    newPassword: String(newPassword || "")
                })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                setError(result?.error?.message || "Password reset failed.");
                return;
            }

            setSuccess("Password reset successfully. You can now log in.");
            setNewPassword("");
            setConfirmPassword("");
        } catch {
            setError("Could not connect to reset API.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ICareNavbar />
            <section className={styles.wrap} aria-label="Reset password">
                <div className={styles.container}>
                    <div className={styles.card}>
                        <p className={styles.kicker}>Security</p>
                        <h1 className={styles.title}>Set a new password</h1>

                        <form onSubmit={onSubmit} className={styles.form}>
                            <label className={styles.label} htmlFor="token">
                                Reset token
                            </label>
                            <input
                                id="token"
                                type="text"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                className={styles.input}
                                required
                            />

                            <label className={styles.label} htmlFor="newPassword">
                                New password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={styles.input}
                                autoComplete="new-password"
                                required
                            />

                            <label className={styles.label} htmlFor="confirmPassword">
                                Confirm new password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.input}
                                autoComplete="new-password"
                                required
                            />

                            <div className={styles.formActions}>
                                <button className={styles.loginBtn} type="submit" disabled={loading}>
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                                <Link to="/login" className={styles.forgotLink}>
                                    Back to login
                                </Link>
                            </div>

                            {error ? <div className={styles.errorText}>{error}</div> : null}
                            {success ? <div className={styles.successBanner}>{success}</div> : null}
                        </form>
                    </div>
                </div>
            </section>
            <ICareFooter />
        </>
    );
}
