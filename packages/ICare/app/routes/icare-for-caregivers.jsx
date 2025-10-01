import React from "react";
import { Link } from "react-router";
import HeroComponent from "../components/hero/hero-component"
import { IcarePage, IcareSection, IcareCard } from "react-library";
import heroImage from "/images/heros/icare-for-caregivers.jpg";



export default function ICareForCaregivers() {





    return (
        <IcarePage>
            <HeroComponent imgSrc={heroImage} />


            <IcareSection>
                <IcareCard variant="elevated">
                    <span slot="contents">
                        <h2 style={{ display: "flex", justifyContent: "center" }}>Where families meet caregivers.
                            Care made personal.</h2>
                        <div style={{ overflow: "hidden", maxWidth: "1000px", margin: "0 auto" }}>
                            <fig style={{ width: "200px", float: "right", marginLeft: "1rem" }}>

                            </fig>
                            <p>With years of experience in healthcare, we understand the challenges faced by both caregivers and families.</p> <p>From the first step of seeking support to the daily realities of care, we know how important trust and empathy are.<p>At ICare, we believe everyone deserves dignity, and every family deserves peace of mind.</p> Whether you need in-home care, companionship, or specialized support, ICare helps you connect with trusted caregivers in your area.</p>
                        </div>
                    </span>
                </IcareCard>
                {/* <div style={sectionShell}>
                        {featureCards.map((c, i) => (
                            <IcareCard key={c.title + i} variant="elevated">
                                <span slot="contents">
                                    <fig style={{ width: "50px", display: "flex", justifyContent: "center", margin: "0 auto" }}>
                                        <img src={c.icon} alt="Icon" style={{ width: "100%" }} />
                                    </fig>
                                    <h2 style={{ display: "flex", justifyContent: "center" }}>{c.title}</h2>
                                    <p>{c.text}</p>
                                </span>
                            </IcareCard>
                        ))}
                    </div> */}
            </IcareSection>
            <IcareSection />

        </IcarePage>



    );
}
