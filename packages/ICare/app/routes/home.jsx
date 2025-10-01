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
                    <span slot="contents" style={{ display: "block", backgroundColor: "#eee", padding: "4rem", borderRadius: "3rem" }}>
                        <h2 style={{ display: "flex", justifyContent: "center" }}>Where families meet caregivers.
                            Care made personal.</h2>
                        <div style={{ overflow: "hidden", maxWidth: "1000px", margin: "0 auto" }}>
                            <fig style={{ width: "200px", float: "right", marginLeft: "1rem" }}>

                            </fig>
                            <p>With years of experience in healthcare, we understand the challenges faced by both caregivers and families.</p> <p>From the first step of seeking support to the daily realities of care, we know how important trust and empathy are.<p>At ICare, we believe everyone deserves dignity, and every family deserves peace of mind.</p> Whether you need in-home care, companionship, or specialized support, ICare helps you connect with trusted caregivers in your area.</p>
                        </div>
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
