import cardImage from "/images/web-cards/web-card-image-1.jpg";
import cardImage3 from "/images/web-cards/web-card-image-3.jpg";
import cardImage5 from "/images/heros/who-we-are.jpg";
import cardImage4 from "/images/web-cards/web-card-image-4.jpg";
import bannerImage1 from "/images/banners/banner-image-1.jpg";
import cardImage2 from "/images/web-cards/web-card-image-2.jpg";
import cardImage6 from "/images/heros/icare-for-caregivers.jpg";
import cardImage7 from "/images/heros/icare-for-carereceivers.jpg";
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
      <HeroComponent imgSrc={cardImage5} />
      <IcareSection>
        <IcareCard variant="flat">
          <span slot="contents">
            <h2 style={{ display: "flex", justifyContent: "center" }}>ICare. Find the care you need, when you need it.</h2>
            <div style={{ overflow: "hidden" }}>
              <fig style={{ width: "200px", float: "right", marginLeft: "1rem" }}>
                <img src="/images/icare-logo.svg" alt="Heart Icon" style={{ width: "100%" }} />
              </fig>
              <p>With several years’ experience of working in the healthcare service, we understand the difficulties that all parties face - both caregivers and care receivers.</p>
              <p>From taking those first steps reaching-out for support for a loved one, to managing and scheduling the daily challenges caregivers face caring for their clients, we understand the difficulties people encounter.</p>
              <p>We believe that every person deserves to be supported with dignity and empathy, and every family deserves peace of mind.  </p>
              <p>Whether you're looking for in-home care, companionship, or specialized services, ICare makes it easy to find trusted caregivers in your area.</p>
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
            <span slot="header-contents">Safety comes first.</span>
            <span slot="body-contents">Your information stays safe and private, thanks to strong built-in security.</span>
          </IcareWebBlock>
          <IcareWebBlock layout='text-bottom' imgSrc={cardImage6}>
            <span slot="header-contents">Safety comes first.</span>
            <span slot="body-contents">Your information stays safe and private, thanks to strong built-in security.</span>
          </IcareWebBlock>
          <IcareWebBlock layout='text-bottom' imgSrc={cardImage7}>
            <span slot="header-contents">Safety comes first.</span>
            <span slot="body-contents">Your information stays safe and private, thanks to strong built-in security.</span>
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
