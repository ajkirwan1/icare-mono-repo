import React from "react";
import { IcareHeroNew, IcareButton } from "react-library";
import { Link } from "react-router";
import navLinks from "./nav-links";

export default function HeroComponent({ imgSrc }) {
    return (
        <IcareHeroNew
            imageSrc={imgSrc}
            slot="hero-content">
            {navLinks.map((link) => (
                <li slot="nav-links" key={link.to}>
                    <Link to={link.to}>{link.text}</Link>
                </li>
            ))}
            <li slot="header-buttons">
                <IcareButton href='/register'>
                    <span>Get Started</span>
                </IcareButton>
            </li>
            <span
                slot="header-content"
                style={{ display: "block", width: "100%", textAlign: "left", marginTop: "6rem" }}
            >
                ICare
            </span>

            <span
                slot="subheader-content"
                style={{ display: "block", width: "100%", textAlign: "left" }}
            >
                We are not an agency. ICare is the answer to the real needs of families — helping them safely connect with trusted caregivers.
            </span>

        </IcareHeroNew>
    );
}
