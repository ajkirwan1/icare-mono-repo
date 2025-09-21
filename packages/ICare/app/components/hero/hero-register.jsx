import React from "react";
import { IcareHeroNew, IcareCard, IcareButton } from "react-library";
import { Link, Form } from "react-router";
import navLinks from "./nav-links";
import styles from "./hero-register.module.scss";


export default function HeroRegisterComponent({ imgSrc }) {
  return (
    <IcareHeroNew imageSrc={imgSrc} slot="hero-content">
      {navLinks.map((link) => (
        <li slot="nav-links" key={link.to}>
          <Link to={link.to}>{link.text}</Link>
        </li>
      ))}

      <span slot="header-content">
        <div className={styles.root}>
          <IcareCard variant="elevated">
            <div slot="contents" className={styles.registerCard}>
              <h1 className={styles.title}>Register</h1>
              <Form id="registerForm" method="post" action="/register" className={styles.form}>
                <div className={styles.formRow}>
                  <label className={styles.label} htmlFor="username">Username</label>
                  <input
                    id="username"
                    className={styles.input}
                    type="text"
                    name="username"
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.label} htmlFor="password">Password</label>
                  <input
                    id="password"
                    className={styles.input}
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <div className={styles.actions}>
                  <IcareButton type="submit">Submit</IcareButton>
                </div>
              </Form>
              <p className={styles.helper}>
                Sign up now to access our comprehensive care management tools and resources.
              </p>
            </div>
          </IcareCard>
        </div>
      </span>
    </IcareHeroNew>
  );
}
