import React from "react";
import Accordion from "../../../../components/website/common/accordian/accordian";

export default function ReceiversFAQ() {
    const faqs = [
        {
            q: "What services will be available?",
            a: "We’re launching with companionship services. Companionship is about spending quality time together - going for walks, sharing conversation over tea, helping with hobbies or puzzles, watching favourite programmes, accompanying someone to the shops, or simply offering warm, reassuring company. It’s the human presence that turns lonely moments into meaningful ones.",
        },
        {
            q: "How will I know caregivers are trustworthy?",
            a: "Safety is a foundation of ICare. All caregivers complete our verification process before connecting with families, including identity and eligibility checks where appropriate. Profiles also show experience and supporting details, so you can make informed decisions. We’re building this with your peace of mind at the centre, and will share more details at launch.",
        },
        {
            q: "Can I choose my own caregiver?",
            a: "Yes. You’re always in control. You’ll be able to browse profiles of verified companions in your area, learn about their background and interests, and decide who feels like the right match for your loved one. Care is never assigned - it’s chosen.",
        },
        {
            q: "What if I need personal care, not just companionship?",
            a: "We’re starting with companionship services because connection is at the heart of good care. Personal care support is part of our future roadmap. If you join the waitlist, we’ll keep you informed as additional services become available. For many families, companionship alone already makes a meaningful difference.",
        },
        {
            q: "How much will it cost?",
            a: "We’re working to make quality companionship accessible for families while ensuring caregivers are paid fairly. Pricing details are being finalised and will be shared transparently closer to launch. Families on our waitlist will be among the first to receive updates.",
        },

        // ✅ Additional MVP questions
        {
            q: "Is ICare a care agency?",
            a: "No. ICare is a matching platform, not a care agency. Caregivers work independently, and families and caregivers agree arrangements directly, without agency pressure or long-term contracts.",
        },
        {
            q: "How do arrangements get agreed?",
            a: "Families and caregivers communicate directly to discuss needs, schedules and expectations. This allows both sides to feel comfortable and aligned before care begins.",
        },
        {
            q: "Can support change over time?",
            a: "Yes. Needs evolve, and arrangements can be adjusted. You can revisit schedules or look for a different caregiver if circumstances change.",
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

            {/* GLOBAL OVERRIDES — consistent with Caregivers FAQ */}
            <style>{`
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
