import Accordion from "../../../../components/website/common/accordian/accordian";
import styles from "../../common/accordian/faq-section.module.scss";

export default function ReceiversFAQ() {
    const faqs = [
        {
            q: "What services will be available?",
            a: "We're launching with companionship services. Companionship is about spending quality time together - going for walks, sharing conversation over tea, helping with hobbies or puzzles, watching favourite programmes, accompanying someone to the shops, or simply offering warm, reassuring company. It's the human presence that turns lonely moments into meaningful ones.",
        },
        {
            q: "How will I know caregivers are trustworthy?",
            a: "Safety is a foundation of ICare. All caregivers complete mandatory ID verification, right to work checks, and admin approval before connecting with families. Voluntary DBS certificates are verified and displayed as a trust badge. Profiles also show experience and supporting details, so you can make informed decisions.",
        },
        {
            q: "Can I choose my own caregiver?",
            a: "Yes. You're always in control. You'll be able to browse profiles of verified companions in your area, learn about their background and interests, and decide who feels like the right match for your loved one. Care is never assigned - it's chosen.",
        },
        {
            q: "What if I need personal care, not just companionship?",
            a: "We're starting with companionship because meaningful connection is where care begins. Personal care services are something we're working towards as we grow. If you join the waitlist, we'll keep you informed as additional services become available. For many families, companionship alone already makes a meaningful difference.",
        },
        {
            q: "How much will it cost?",
            a: "You agree rates directly with your caregiver — there are no hidden agency markups. Use our cost estimator on the homepage to see how direct care compares to agency pricing.",
        },
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
            a: "Yes. Needs evolve, and arrangements can be adjusted. You can revisit schedules or look for a different caregiver if circumstances change.We’ll support you in next steps.",
        },
    ];

    return (
        <section aria-label="FAQ" className={styles.section}>
            <h2 className={styles.heading}>
                Frequently asked questions
            </h2>
            <Accordion items={faqs} />
        </section>
    );
}
