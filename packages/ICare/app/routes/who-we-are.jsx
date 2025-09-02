import React from "react";
import { Link } from "react-router";
import whoWeAreHeroSrc from "/images/heros/who-we-are.jpg";
import { IcareBanner, IcareButton, IcareCard, IcareHeroNew, IcarePage, IcareSection, IcareWebBlock, IcareWebMinihero } from "../src/components/stencil-generated/components";

export default function WhoWeAre() {


  return (
    <IcarePage>
      <IcareHeroNew slot="hero-content" imageSrc={whoWeAreHeroSrc}>
        <span slot="header-content">Who We Are</span>
        <span slot="subheader-content">ICare was founded to make finding quality care personal, transparent, affordable, and safe.</span>
      </IcareHeroNew>
        <IcareSection>
          <IcareCard variant="elevated">
            <span slot="contents">
            <h2 style={{display: 'flex', justifyContent:'center'}}>ICare. Find the care you need, when you need it.</h2>
              <div style={{ overflow: "hidden" }}>
                  <fig style={{width:"200px", float:"right", marginLeft:"1rem"}}>
                    <img src="/images/icare-logo.svg" alt="Heart Icon" style={{width:'100%'}}/>
                  </fig>
                  <p>With several years’ experience of working in the healthcare service, we understand the difficulties that all parties face - both caregivers and care receivers.</p>
                  <p>From taking those first steps reaching-out for support for a loved one, to managing and scheduling the daily challenges caregivers face caring for their clients, we understand the difficulties people encounter.</p>
                  <p>We believe that every person deserves to be supported with dignity and empathy, and every family deserves peace of mind.  </p>
                  <p>Whether you're looking for in-home care, companionship, or specialized services, ICare makes it easy to find trusted caregivers in your area.</p>
              </div>
            </span>
          </IcareCard>
        </IcareSection>
        <IcareSection>
          <IcareCard variant="outlined">
            <span slot="contents">
            <h2 style={{display: 'flex', justifyContent:'center'}}>ICare. Find the care you need, when you need it.</h2>
              <div style={{ overflow: "hidden" }}>
                  <fig style={{width:"200px", float:"right", marginLeft:"1rem"}}>
                    <img src="/images/icare-logo.svg" alt="Heart Icon" style={{width:'100%'}}/>
                  </fig>
                  <p>With several years’ experience of working in the healthcare service, we understand the difficulties that all parties face - both caregivers and care receivers.</p>
                  <p>From taking those first steps reaching-out for support for a loved one, to managing and scheduling the daily challenges caregivers face caring for their clients, we understand the difficulties people encounter.</p>
                  <p>We believe that every person deserves to be supported with dignity and empathy, and every family deserves peace of mind.  </p>
                  <p>Whether you're looking for in-home care, companionship, or specialized services, ICare makes it easy to find trusted caregivers in your area.</p>
              </div>
            </span>
          </IcareCard>
        </IcareSection>
    </IcarePage >
  );
}