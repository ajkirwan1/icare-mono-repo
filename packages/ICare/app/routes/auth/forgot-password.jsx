import { useState } from "react";
import { Link } from "react-router";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import styles from "./login.module.scss";

const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function meta() {
    return [
        { title: "ICare | Forgot Password" },
        { name: "description", content: "Request a password reset link for your ICare account." }
    ];
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [debugToken, setDebugToken] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");
        setDebugToken("");

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/api/v1/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({ email: String(email || "").trim().toLowerCase() })
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                setError(result?.error?.message || "Could not send reset link.");
                return;
            }

            setSuccess("If an account with that email exists, a password reset link has been sent.");
            if (result?.data?.debugResetToken) {
                setDebugToken(String(result.data.debugResetToken));
            }
        } catch {
            setError("Could not connect to reset API.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ICareNavbar />
            <section className={styles.wrap} aria-label="Forgot password">
                <div className={styles.container}>
                    <div className={styles.card}>
                        <p className={styles.kicker}>Password help</p>
                        <h1 className={styles.title}>Reset your password</h1>

                        <form onSubmit={onSubmit} className={styles.form}>
                            <label className={styles.label} htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                autoComplete="email"
                                required
                            />

                            <div className={styles.formActions}>
                                <button className={styles.loginBtn} type="submit" disabled={loading}>
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </button>
                                <Link to="/login" className={styles.forgotLink}>
                                    Back to login
                                </Link>
                            </div>

                            {error ? <div className={styles.errorText}>{error}</div> : null}
                            {success ? <div className={styles.successBanner}>{success}</div> : null}
                            {debugToken ? (
                                <div className={styles.successBanner}>
                                    Dev token: <code>{debugToken}</code>
                                    <br />
                                    <Link to={`/reset-password?token=${encodeURIComponent(debugToken)}`} className={styles.forgotLink}>
                                        Open reset page with token
                                    </Link>
                                </div>
                            ) : null}
                        </form>
                    </div>
                </div>
            </section>
            <ICareFooter />
        </>
    );
}
