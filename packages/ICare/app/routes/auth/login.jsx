import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import { login } from "../../services/login-service";
import { redirect, NavLink } from "react-router";
import styles from "./login.module.scss";

export function meta() {
  return [
    { title: "ICare | Login" },
    { name: "description", content: "Choose your account type to continue with ICare." }
  ];
}

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const loginDetails = await login(username, password);

  if (!loginDetails.success) {
    return { error: loginDetails.message };
  }

  if (loginDetails.userdetails.role === "caregiver") {
    return redirect("/carerecipient");
  }

  if (loginDetails.userdetails.role === "carerecipient") {
    return redirect("/carerecipient");
  }

  return null;
}

export default function LoginPage() {
  const handleCardKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <>
      <ICareNavbar />

      <section className={styles.wrap} aria-label="Choose account type">
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.brand} aria-label="icare logo">
              <img src="/images/logo/icareblack.svg" alt="ICare" className={styles.brandLogo} width={121} height={48} />
            </div>

            <p className={styles.kicker}>Welcome back</p>
            <h1 className={styles.title}>Continue as</h1>
            <p className={styles.newAccount}>
              New to ICare?{" "}
              <NavLink to="/register" className={styles.newAccountLink}>
                Create your account here
              </NavLink>
            </p>

            <div className={styles.roleGrid}>
              <NavLink
                to="/caregiver"
                className={`${styles.roleCard} ${styles.primaryRoleCard}`}
                onKeyDown={handleCardKeyDown}
              >
                <span className={styles.roleTitle}>CAREGIVER</span>
                <span className={styles.roleText}>Create your profile, set availability, get matched.</span>
              </NavLink>

              <NavLink
                to="/carereceiver"
                className={`${styles.roleCard} ${styles.primaryRoleCard}`}
                onKeyDown={handleCardKeyDown}
              >
                <span className={styles.roleTitle}>CARE RECEIVER</span>
                <span className={styles.roleText}>Find trusted carers, message and organise support.</span>
              </NavLink>
            </div>

            <p className={styles.staffLoginRow}>
              <NavLink to="/admin" className={styles.staffLoginLink}>
                Staff login
              </NavLink>
            </p>
          </div>
        </div>
      </section>

      <ICareFooter />
    </>
  );
}
