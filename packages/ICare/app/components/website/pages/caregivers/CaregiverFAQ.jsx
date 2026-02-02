import React from "react";
import Accordion from "../../../../components/website/common/accordian/accordian";

export default function CaregiverFAQ() {
    const faqs = [
        {
            q: "Do I need qualifications to join?",
            a: "For companionship care, what matters most is who you are as a person. Being patient, kind and reliable - and treating older adults with dignity and respect — are key. Formal care qualifications are welcome but not required for companionship roles. We’re looking for people who genuinely care about connecting with others.",
        },
        {
            q: "Can I set my own hours and rates?",
            a: "Yes. You control your availability, the areas you’re willing to work in, and the type of companionship you want to provide. This is your practice. You’re not fitting into someone else’s rota or being told where to be and when.",
        },
        {
            q: "How does the platform work?",
            a: "You create a profile that shows who you are and what you offer. Families looking for companionship can find your profile and reach out directly. You decide which requests feel like the right fit and agree arrangements together. Over time, you build a reputation based on the quality of care and connection you provide.",
        },
        {
            q: "What support will I receive?",
            a: "You’ll be part of a community of caregivers who share your values. We’re building guidance, resources and practical support into the platform to help you work confidently. While you remain independent, you’re not left to figure everything out alone. More details will be shared closer to launch.",
        },
        {
            q: "How do I get paid?",
            a: "We’re building a clear and straightforward payment system into ICare. You’ll be paid for the companionship you provide, and fairness and transparency are core values in how we design this. Full details about payments and timing will be shared when we launch.",
        },

        // ✅ Added MVP questions
        {
            q: "Is ICare an agency?",
            a: "No. ICare is a matching platform - not a care agency. We don’t employ caregivers, assign shifts or manage rotas. Arrangements are made directly between caregivers and families.",
        },
        {
            q: "Do I need DBS or insurance?",
            a: "Requirements depend on the type of support you provide. For companionship roles, formal documents may not always be required, but adding DBS (if you have it), references or insurance can help build trust with families.",
        },
        {
            q: "Can I pause or remove my profile?",
            a: "Yes. You can update, pause or remove your profile at any time. There are no long-term commitments or fixed contracts.",
        },
    ];

    return (
        <section
            aria-label="FAQ"
            style={{
                maxWidth: "920px",
                margin: "0 auto",
                padding: "clamp(3.6rem, 5vw, 5.6rem) 1.2rem",
            }}
        >
            <h2
                style={{
                    fontSize: "clamp(1.9rem, 2.4vw, 2.3rem)",
                    lineHeight: 1.2,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    paddingBottom: "clamp(1.6rem, 2.6vw, 2.2rem)",
                    margin: 0,
                }}
            >
                Frequently asked questions
            </h2>

            {/* GLOBAL OVERRIDES — identycznie jak w ReceiversFAQ */}
            <style>{`
        /* FAQ accordion boxes */
        .accordion-item,
        [class*="accordion"] {
          box-shadow: none !important;
          transform: none !important;
          transition: none !important;
        }

        .accordion-item:hover,
        [class*="accordion"]:hover {
          box-shadow: none !important;
          transform: none !important;
        }

        /* Padding inside FAQ boxes */
        .accordion-header,
        .accordion-title {
          padding: 1.4rem 1.5rem !important;
          font-weight: 500;
        }

        .accordion-content,
        .accordion-body {
          padding: 0.8rem 1.5rem 1.4rem !important;
          line-height: 1.6;
        }
      `}</style>

            <Accordion items={faqs} />
        </section>
    );
}
