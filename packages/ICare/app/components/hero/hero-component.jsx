import React from "react";
import { IcareHeroNew } from "react-library";
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
      <span slot="header-content">ICare</span>
      <span slot="subheader-content">Learn more about ICare and our mission to connect caregivers and care receivers.</span>
    </IcareHeroNew>
  );
}
