import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";
import Accordion from "~/components/website/common/accordian/accordian";
import { NavLink } from "react-router";
import styles from "~/styles/pages/faqs.module.scss";

export const meta = () => {
  return [
    { title: "FAQ - Your Questions About iCare Answered" },
    { name: "description", content: "Get answers about iCare's companionship platform. Learn how we connect families with trusted caregivers, what services we offer, and how to join our waitlist." },
    { name: "keywords", content: "iCare FAQ, companionship care questions, how does iCare work, caregiver platform FAQ" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Frequently Asked Questions - iCare" },
    { property: "og:description", content: "Get answers about iCare's companionship platform, services, safety, and how to join the waitlist." },
    { property: "og:url", content: "https://icare.co.uk/faq" },
    { property: "og:image", content: "https://icare.co.uk/images/og-faq.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "FAQ: Your questions about iCare answered" },

    // Twitter Card
    { name: "twitter:title", content: "FAQ - Your Questions About iCare Answered" },
    { name: "twitter:description", content: "Find answers about companionship care, safety, pricing, and more. Your questions answered." },
    { name: "twitter:image", content: "https://icare.co.uk/images/twitter-faq.jpg" },
    { name: "twitter:image:alt", content: "Frequently asked questions about iCare" }
  ];
};

export const links = () => {
  return [
    { rel: "canonical", href: "https://icare.co.uk/faq" }
  ];
};

const faqsCaregivers = [
    {
        q: "Do I need qualifications to join?",
        a: "For companionship care, what matters most is who you are as a person. Being patient, kind and reliable - and treating older adults with dignity and respect — are key. Formal care qualifications are welcome but not required for companionship roles. We're looking for people who genuinely care about connecting with others."
    },
    {
        q: "Can I set my own hours and rates?",
        a: "Yes. You control your availability, the areas you're willing to work in, and the type of companionship you want to provide. This is your practice. You're not fitting into someone else's rota or being told where to be and when."
    },
    {
        q: "How does the platform work?",
        a: "You create a profile that shows who you are and what you offer. Families looking for companionship can find your profile and reach out directly. You decide which requests feel like the right fit and agree arrangements together. Over time, you build a reputation based on the quality of care and connection you provide."
    },
    {
        q: "What support will I receive?",
        a: "You'll be part of a community of caregivers who share your values. We're building guidance, resources and practical support into the platform to help you work confidently. While you remain independent, you're not left to figure everything out alone. More details will be shared closer to launch."
    },
    {
        q: "How do I get paid?",
        a: "We're building a clear and straightforward payment system into iCare. You'll be paid for the companionship you provide, and fairness and transparency are core values in how we design this. Full details about payments and timing will be shared when we launch."
    },
    {
        q: "Do I need DBS or insurance?",
        a: "Requirements depend on the type of support you provide. For companionship roles, formal documents may not always be required, but adding DBS (if you have it), references or insurance can help build trust with families."
    },
    {
        q: "Can I pause or remove my profile?",
        a: "Yes. You can update, pause or remove your profile at any time. There are no long-term commitments or fixed contracts."
    }
];

const faqsFamilies = [
    {
        q: "What services will be available?",
        a: "We're launching with companionship services. Companionship is about spending quality time together - going for walks, sharing conversation over tea, helping with hobbies or puzzles, watching favourite programmes, accompanying someone to the shops, or simply offering warm, reassuring company. It's the human presence that turns lonely moments into meaningful ones."
    },
    {
        q: "How will I know caregivers are trustworthy?",
        a: "Safety is a foundation of iCare. All caregivers complete our verification process before connecting with families, including identity and eligibility checks where appropriate. Profiles also show experience and supporting details, so you can make informed decisions. We're building this with your peace of mind at the centre, and will share more details at launch."
    },
    {
        q: "Can I choose my own caregiver?",
        a: "Yes. You're always in control. You'll be able to browse profiles of verified companions in your area, learn about their background and interests, and decide who feels like the right match for your loved one. Care is never assigned - it's chosen."
    },
    {
        q: "What if I need personal care, not just companionship?",
        a: "We're starting with companionship services because connection is at the heart of good care. Personal care support is part of our future roadmap. If you join the waitlist, we'll keep you informed as additional services become available. For many families, companionship alone already makes a meaningful difference."
    },
    {
        q: "How much will it cost?",
        a: "We're working to make quality companionship accessible for families while ensuring caregivers are paid fairly. Pricing details are being finalised and will be shared transparently closer to launch. Families on our waitlist will be among the first to receive updates."
    },
    {
        q: "How do arrangements get agreed?",
        a: "Families and caregivers communicate directly to discuss needs, schedules and expectations. This allows both sides to feel comfortable and aligned before care begins."
    },
    {
        q: "Can support change over time?",
        a: "Yes. Needs evolve, and arrangements can be adjusted. You can revisit schedules or look for a different caregiver if circumstances change."
    }
];

const generalQuestions = [
    {
        q: "What is iCare?",
        a: "iCare is a platform connecting families with trusted companions for elderly relatives across the UK. We're making it easier for families to find caring people who can spend quality time with their loved ones, and for caregivers to build meaningful, flexible practices. We're starting with companionship services because connection matters most."
    },
    {
        q: "When will iCare launch?",
        a: "We're working hard to launch in the coming months. We're building this thoughtfully to ensure we get the important things right, particularly around trust and safety. Families and caregivers on our waitlist will be the first to know when we're ready to launch and will get priority access to the platform."
    },
    {
        q: "Where will iCare be available?",
        a: "We're launching across the UK. We're building a national platform designed to serve families and caregivers throughout England, Scotland, Wales, and Northern Ireland. As we grow, we'll work to ensure strong caregiver availability in communities across the country."
    },
    {
        q: "How is iCare different from care agencies?",
        a: "Traditional care agencies typically assign whoever is available on their rota without giving you real choice. They often feel rushed and transactional. iCare is fundamentally different. We give families genuine choice over who spends time with their loved one. We enable caregivers to build their own practices with flexibility and control. We focus on relationships, not transactions, and we build trust and safety into everything from the ground up."
    },
    {
        q: "Is iCare a care agency?",
        a: "No, we're not a traditional care agency. We're a platform that connects families directly with independent companion caregivers. We handle verification and safeguarding, but families choose who they work with and caregivers control their own schedules and practice. This model gives everyone more choice, flexibility, and control."
    }
];

const faqsSafety = [
    {
        q: "How will iCare protect vulnerable adults?",
        a: "Safety is built into every layer of iCare. All caregivers must complete identity verification, eligibility checks, and admin approval before their profile goes live. We're designing safeguarding policies aligned with the Care Act 2014 and building reporting tools directly into the platform. Every decision we make is guided by the safety and wellbeing of the people who use iCare."
    },
    {
        q: "What if there is an emergency during a visit?",
        a: "For any medical emergency, always call 999 first. iCare is not an emergency response service. After ensuring immediate safety, you can notify iCare so we can document the incident and take any necessary action."
    },
    {
        q: "How do I report a safeguarding concern?",
        a: "We're building a clear and accessible reporting process into the platform. You'll be able to raise concerns directly through iCare, and all reports will be taken seriously and reviewed promptly. Full details of how reporting will work will be shared at launch."
    },
    {
        q: "Is my data safe with iCare?",
        a: "Yes. We comply with GDPR and UK data protection law. We collect only the minimum information needed and never share your personal details without your consent. At launch, we will collect standard personal data only - no medical or health information. You can read more in our Privacy Policy."
    }
];

const waitlistQuestions = [
    {
        q: "Why should I join the waitlist?",
        a: "Joining the waitlist means you'll be among the first to access iCare when we launch. You'll get priority access, regular updates on our progress, and the opportunity to help shape what we build. Waitlist members are our founding community, and your input matters to us. Whether you're a family seeking care or a caregiver looking for better opportunities, being on the waitlist puts you at the front of the queue."
    },
    {
        q: "What happens after I sign up?",
        a: "Once you join the waitlist, you'll receive a confirmation email welcoming you to the community. From there, we'll send you regular updates sharing our progress, explaining features we're building, and asking for your feedback on what matters most to you. There's no obligation and no commitment - you're simply expressing interest in a better way forward."
    },
    {
        q: "Will I get priority when you launch?",
        a: "Yes. Waitlist members will be the first to be invited to join iCare when we launch. We're building this for the families and caregivers who believe, like we do, that there's a better way to approach companionship care. Being on the waitlist means you'll be first in line when we're ready."
    },
    {
        q: "How can I stay updated?",
        a: "The best way to stay informed is to join our waitlist. You'll receive regular email updates about our progress. You can also subscribe to our Care Guidance newsletter, which provides practical advice for families navigating elderly care challenges while we're building the platform. We share updates on social media as well, but email is the most reliable way to hear from us directly."
    }
];


function buildFaqSchema(...groups) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": groups.flat().map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
    };
}

export default function FaqsPage() {
    const jsonLd = buildFaqSchema(
        generalQuestions, faqsFamilies, faqsCaregivers, faqsSafety, waitlistQuestions
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ICareNavbar />
            <main className={styles.page}>
                <section className={styles.section}>
                    <h1>Frequently Asked Questions</h1>
                    <p>
                        We know you have questions about iCare, what we're building, and how it will work.<br />This page answers the
                        most common questions we hear from families and caregivers interested in joining our community.
                        If your question isn&apos;t answered here, please contact us. We&apos;re happy to help.
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 style={{ color: "#5f7235" }} className={styles.h2}>General Questions</h2>
                    <Accordion items={generalQuestions} />
                </section>
                <section className={styles.section}>
                    <h2 className={styles.h2}>For Families</h2>
                    <Accordion items={faqsFamilies} />
                </section>
                <section className={styles.section}>
                    <h2 className={styles.h2}>For Caregivers</h2>
                    <Accordion items={faqsCaregivers} />
                </section>
                <section className={styles.section}>
                    <h2 className={styles.h2}>Safety and Safeguarding</h2>
                    <Accordion items={faqsSafety} />
                </section>
                <section className={styles.section}>
                    <h2 className={styles.h2}>Waitlist Questions</h2>
                    <Accordion items={waitlistQuestions} />
                    <p>Join hundreds of others waiting for a better way.{" "}
                        <NavLink to="/#waitlist" className={styles.link}>Join the Waitlist</NavLink>
                    </p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.h2}>Still Have Questions?</h2>
                    <p>
                        If your question wasn&apos;t answered here, we&apos;d love to hear from you. Contact us and we&apos;ll get back to you as
                        soon as we can.
                    </p>
                    <NavLink to="/contact-us" className={styles.link}>Contact us</NavLink>
                </section>
            </main>
            <ICareFooter />
        </>
    );
}
