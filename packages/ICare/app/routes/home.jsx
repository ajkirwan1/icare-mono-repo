import cardImage from "/images/web-cards/web-card-image-1.jpg";
import cardImage3 from "/images/web-cards/web-card-image-3.jpg";
import cardImage5 from "/images/heros/who-we-are.jpg";
import cardImage4 from "/images/web-cards/web-card-image-4.jpg";
import bannerImage1 from "/images/banners/banner-image-1.jpg";
import cardImage2 from "/images/web-cards/web-card-image-2.jpg";
import cardImage6 from "/images/heros/icare-for-caregivers.jpg";
import cardImage7 from "/images/heros/icare-for-carereceivers.jpg";
import heroImage from "/images/heros/hero-landing-page.jpg";
import { IcareBanner, IcareCard, IcarePage, IcareSection, IcareWebBlock, IcareWebMinihero } from "react-library";
import HeroComponent from "../components/hero/hero-component";

export function meta() {
    return [
        { title: "ICare | Home" },
        { name: "description", content: "ICare – Supporting better care through intuitive tools." }
    ];
}

export default function Home() {

    return (
        <IcarePage>
            <HeroComponent imgSrc={heroImage} />
            <IcareSection>
                <IcareCard variant="flat">
                    <span
                        slot="contents"
                        style={{
                            display: "block",
                            backgroundColor: "transparent",

                        }}
                    >
                        <section
                            aria-labelledby="icare-intro-title"
                            style={{
                                maxWidth: "1100px",
                                margin: "0 auto",
                                padding: "0 1.25rem",
                            }}
                        >
                            <div
                                style={{
                                    background: "#c8bea92b",
                                    border: "1px solid #c8bea92b",
                                    borderRadius: "2rem",
                                    padding: "2.5rem",
                                    boxShadow: "0 10px 20px rgba(15,23,42,0.06)",
                                }}
                            >
                                <h2
                                    id="icare-intro-title"
                                    style={{
                                        margin: 0,
                                        fontSize: "1.85rem",
                                        lineHeight: 1.35,
                                        fontWeight: 800,
                                        textAlign: "center",
                                        color: "#464647c8",
                                        letterSpacing: "0.2px",
                                    }}
                                >
                                    Where families meet caregivers. <br /> Care made personal.
                                </h2>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        width: "500px",
                                        height: "4px",
                                        background: "#33aeba",
                                        borderRadius: "999px",
                                        margin: "1rem auto 1.75rem",
                                    }}
                                />

                                {/* Kontener treści + obrazka */}
                                <div
                                    style={{
                                        overflow: "hidden",
                                        maxWidth: "1000px",
                                        margin: "0 auto",
                                    }}
                                >

                                    <p style={{ margin: "0 0 0.9rem 0", color: "#334155", lineHeight: 1.7, fontSize: "1rem" }}>
                                        <b>With years of experience in healthcare, we understand the realities on both sides — what families need and what
                                            caregivers deliver every day.</b>
                                    </p>

                                    <p style={{ margin: "0 0 0.9rem 0", color: "#334155", lineHeight: 1.7, fontSize: "1rem" }}>
                                        <b>ICare connects you directly with trusted, verified caregivers in your area — with clear profiles, transparent
                                            terms, and private, secure messaging. No agencies, no guesswork.</b>
                                    </p>

                                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.7, fontSize: "1rem" }}>
                                        <b>Whether you need live-in support, hourly help, or specialized care, you set the terms and stay in control.
                                            Dignity for the person receiving care. Peace of mind for the family.</b>
                                    </p>
                                </div>
                            </div>

                            {/* Prosty mobile tweak (styled-jsx / Next.js) */}
                            <style jsx>{`
      @media (max-width: 820px) {
        figure {
          float: none !important;
          width: 100% !important;
          margin: 0 0 1rem 0 !important;
          aspect-ratio: 16 / 9 !important;
        }
      }
    `}</style>
                        </section>
                    </span>

                </IcareCard>
            </IcareSection>
            <IcareWebBlock imgSrc={cardImage}>
                <span slot="header-contents">ICare.</span>
                <span slot="body-contents">
                    Easily connect with trusted caregivers or people who need care - right from your phone or computer. Quickly find the right match based on location, needs, and qualifications. Set up and manage care agreements with simple tools for scheduling and contracts
                </span>
            </IcareWebBlock>
            <IcareSection>
                <IcareWebBlock layout='text-right' imgSrc={cardImage3}>
                    <span slot="header-contents">Safety comes first.</span>
                    <span slot="body-contents">Your information stays safe and private, thanks to strong built-in security.</span>
                </IcareWebBlock>
            </IcareSection>
            <IcareSection className="full-bleed">
                <IcareBanner className="full-bleed" imgSrc={bannerImage1} />
            </IcareSection>
            <IcareSection>
                <div style={{ display: "flex", gap: "2rem" }}>
                    <IcareWebBlock layout='text-bottom' imgSrc={cardImage2}>
                        <span style={{ fontSize: "1.5rem" }} slot="header-contents">TRUST</span>
                        <span slot="body-contents">Your family’s peace of mind begins here. Transparent process, no hidden fees.
                        </span>
                    </IcareWebBlock>
                    <IcareWebBlock layout='text-bottom' imgSrc={cardImage6}>
                        <span style={{ fontSize: "1.5rem" }} slot="header-contents">SAFETY</span>
                        <span slot="body-contents">Your data and payments are always protected.</span>
                    </IcareWebBlock>
                    <IcareWebBlock layout='text-bottom' imgSrc={cardImage7}>
                        <span style={{ fontSize: "1.5rem" }} slot="header-contents">CARE</span>
                        <span slot="body-contents">From daily support to specialized help.</span>
                    </IcareWebBlock>
                </div>
            </IcareSection>
            <IcareSection>
                <div style={{ display: "flex", gap: "2rem" }}>
                    <IcareWebMinihero imgSrc={cardImage4} href="/icare-for-caregivers">
                        <span slot="header">ICare for Caregivers</span>
                        <span slot="text">Find out more</span>
                    </IcareWebMinihero>
                    <IcareWebMinihero imgSrc={cardImage5} href="/icare-for-carereceivers">
                        <span slot="header">ICare for Carereceivers</span>
                        <span slot="text">Find out more</span>
                    </IcareWebMinihero>
                </div>
            </IcareSection>
        </IcarePage>
    );
}
