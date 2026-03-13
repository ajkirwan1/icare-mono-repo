import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import { Link, NavLink, useSearchParams } from "react-router";
import { useState } from "react";
import { TERMS_ACCEPTED_AT_KEY } from "../../utils/terms-acceptance";
import styles from "./login.module.scss";

export function meta() {
    return [
        { title: "ICare | Login" },
        { name: "description", content: "Choose your account type to continue with ICare." }
    ];
}

const API_BASE = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const LOGIN_API_PATH = "/api/v1/auth/login";

function resolveLoginEndpoints() {
    const endpoints = [];
    const pushUnique = (url) => {
        if (url && !endpoints.includes(url)) {
            endpoints.push(url);
        }
    };

    if (API_BASE) {
        pushUnique(`${API_BASE}${LOGIN_API_PATH}`);
    }

    if (typeof window !== "undefined") {
        pushUnique(`${window.location.origin}${LOGIN_API_PATH}`);
        if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
            pushUnique(`http://localhost:4001${LOGIN_API_PATH}`);
            pushUnique(`http://127.0.0.1:4001${LOGIN_API_PATH}`);
        }
    } else {
        pushUnique(LOGIN_API_PATH);
    }

    return endpoints;
}

function redirectByRole(userType) {
    if (userType === "caregiver") return "/caregiver";
    if (userType === "care_receiver" || userType === "family") return "/carereceiver";
    if (userType === "admin") return "/admin";
    return "/login";
}

function safeSetLocalStorage(key, value) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(key, value);
    } catch {
        // ignore storage failures (private mode / quota / blocked storage)
    }
}

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const registered = searchParams.get("registered") === "1";
    const redirectParam = searchParams.get("redirect");

    async function onSubmit(event) {
        event.preventDefault();
        setError("");

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                email: String(email || "").trim().toLowerCase(),
                password: String(password || "")
            };
            const endpoints = resolveLoginEndpoints();
            let lastHttpError = "Login failed.";
            let lastConnectionError = "";

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json().catch(() => null);
                    if (!response.ok) {
                        const serverError = result?.error;
                        const remainingAttempts = Number.isFinite(serverError?.remainingAttempts)
                            ? ` (${serverError.remainingAttempts} attempts remaining)`
                            : "";
                        lastHttpError = (serverError?.message || "Login failed.") + remainingAttempts;
                        continue;
                    }

                    const data = result?.data || {};
                    if (data.accessToken) {
                        safeSetLocalStorage("icare_access_token", data.accessToken);
                    }
                    if (data.user) {
                        safeSetLocalStorage("icare_user", JSON.stringify(data.user));
                        if (data.user.termsAcceptedAt) {
                            safeSetLocalStorage(TERMS_ACCEPTED_AT_KEY, String(data.user.termsAcceptedAt));
                        }
                    }

                    const defaultTarget = redirectByRole(data?.user?.userType);
                    const target = redirectParam && redirectParam.startsWith("/") ? redirectParam : defaultTarget;
                    window.location.assign(target);
                    return;
                } catch (error) {
                    lastConnectionError = error instanceof Error ? error.message : String(error || "");
                }
            }

            if (lastHttpError && lastHttpError !== "Login failed.") {
                setError(lastHttpError);
                return;
            }

            if (lastConnectionError) {
                setError("Could not connect to login API.");
                return;
            }

            setError(lastHttpError);
        } catch {
            setError("Login failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ICareNavbar />

            <section className={styles.wrap} aria-label="Choose account type">
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.brand} aria-label="icare logo">
                            <img src="/images/logo/icareblack.svg" alt="ICare" className={styles.brandLogo} width={121} height={48} />
                        </div>

                        <h1 className={styles.title}>Welcome back</h1>
                        <p className={styles.newAccount}>
                            New to ICare?{" "}
                            <NavLink to="/register" className={styles.newAccountLink}>
                                Create your account here
                            </NavLink>
                        </p>

                        {registered ? (
                            <div className={styles.successBanner}>
                                Registration successful. Log in with your email and password.
                            </div>
                        ) : null}

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

                            <label className={styles.label} htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                autoComplete="current-password"
                                required
                            />

                            <div className={styles.formActions}>
                                <button className={styles.loginBtn} type="submit" disabled={loading}>
                                    {loading ? "Logging in..." : "Log In"}
                                </button>
                                <Link to="/forgot-password" className={styles.forgotLink}>
                                    Forgot password?
                                </Link>
                            </div>

                            {error ? <div className={styles.errorText}>{error}</div> : null}
                        </form>

                        <div className={styles.roleGrid}>
                            <NavLink to="/caregiver" className={styles.roleCard}>
                                <span className={styles.roleTitle}>I'M A CAREGIVER</span>
                                <span className={styles.roleText}>See how ICare works for independent caregivers.</span>
                            </NavLink>

                            <NavLink to="/carereceiver" className={styles.roleCard}>
                                <span className={styles.roleTitle}>I'M LOOKING FOR CARE</span>
                                <span className={styles.roleText}>Explore how families can find and arrange support.</span>
                            </NavLink>
                        </div>

                        <div className={styles.adminMiniRow}>
                            <NavLink to="/admin" className={styles.adminMiniLink}>
                                Admin
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <ICareFooter />
        </>
    );
}
