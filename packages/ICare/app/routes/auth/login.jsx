import { useState } from "react";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../../services/login-service";
import SubmitButton from "../../components/website/common/buttons/submit-buttons/submit-button";
import { redirect, NavLink } from "react-router";
import styles from "./login.module.scss";


export function meta() {
  return [
    { title: "ICare | Home" },
    { name: "description", content: "ICare – Supporting better care through intuitive tools." }
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
  const [status, setStatus] = useState("idle"); // idle | ok

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("ok");
  };

  return (
    <>
      <ICareNavbar />

      {/* <section aria-label="ICare contact us" className={styles.wrap}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <div className={`icare-2paths ${styles.twoPaths}`}>
            <div className={styles.card}>
              <div className={styles.topRow}>
                <span className={styles.icon} aria-hidden="true">
                  <FontAwesomeIcon className={styles.iconSvg} icon={faHouseUser} />
                </span>
                <h1>Login to ICare</h1>
              </div>

              <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.grid2}>
                  <div>
                    <label className={styles.label} htmlFor="login-email">Username</label>
                    <input
                      id="login-email"
                      className={styles.input}
                      required
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <label className={styles.label} htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      className={styles.input}
                      required
                      placeholder="password"
                    />
                  </div>
                </div>

                <div className={styles.btnWrap}>
                  <SubmitButton variant="tertiary">Submit</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
      <section className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.card}>
            <NavLink to="/admin" className={styles.registerLink}>Admin</NavLink>
            <NavLink to="/caregiver" className={styles.registerLink}>Caregiver</NavLink>
            <NavLink to="/carereceiver" className={styles.registerLink}>Carereceiver</NavLink>
          </div>
        </div>
      </section>

      <ICareFooter />
    </>
  );
}
