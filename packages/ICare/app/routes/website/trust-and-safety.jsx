import ICareNavbar from "../../components/website/pages/shared/icare-navbar";
import ICareFooter from "../../components/website/pages/shared/footers/icare-footer";

const styles = {
    page: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1rem",
        paddingTop: "calc(var(--navbar-height) + 5vh)",
        display: "grid",
        gap: "3.8rem",
        color: "#0F172A",
    },

    hero: {
        display: "grid",
        gap: "1.4rem",
        maxWidth: "92ch",
    },

    section: {
        display: "grid",
        gap: "1.5rem",
        maxWidth: "92ch",
    },

    h1: {
        margin: 0,
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
        color: "#0F172A",
        fontSize: "2.4rem",
    },

    h2: {
        margin: 0,
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        paddingTop: "0.2rem",
        color: "#0F172A",
        fontSize: "1.4rem",
        fontWeight: 700,
    },

    h3: {
        margin: 0,
        lineHeight: 1.2,
        color: "#0F172A",
        fontSize: "1.2rem",
        fontWeight: 700,
    },

    p: {
        margin: 0,
        lineHeight: 1.75,
        fontSize: "1.2rem",
        color: "#0F172A",
        fontWeight: 400,
    },

    lead: {
        margin: 0,
        lineHeight: 1.75,
        fontSize: "1.2rem",
        color: "#0F172A",
        fontWeight: 400,
    },

    spacer: {
        height: "1rem",
    },

    // --- Minimal checklist (ticks only) ---
    checklist: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: "0.85rem",
        fontSize: "1.2rem",
        lineHeight: 1.65,
        color: "#0F172A",
    },

    checklistItem: {
        display: "grid",
        gridTemplateColumns: "14px 1fr",
        gap: "0.75rem",
        alignItems: "start",
    },

    // minimalist tick using borders (no circle)
    tick: {
        width: 12,
        height: 7,
        borderLeft: "1.8px solid rgba(15,23,42,0.85)",
        borderBottom: "1.8px solid rgba(15,23,42,0.85)",
        transform: "rotate(-45deg)",
        marginTop: "0.45rem",
        boxSizing: "border-box",
    },
};

function TickItem({ children }) {
    return (
        <li style={styles.checklistItem}>
            <span aria-hidden="true" style={styles.tick} />
            <span>{children}</span>
        </li>
    );
}

export default function TrustAndSafetyPage() {
    return (
        <>
            <ICareNavbar />

            <section style={styles.page}>
                {/* HERO */}
                <header style={styles.hero}>
                    <h1 style={styles.h1}>Trust and Safety</h1>

                    <p style={styles.lead}>
                        ICare is a platform designed to help caregivers and care receivers connect
                        with confidence, clarity, and respect. While no online marketplace can
                        eliminate all risks, our goal is to provide tools and information that help
                        people make informed decisions.
                    </p>

                    <p style={styles.p}>
                        ICare is built around transparency, respect, and informed choice, helping
                        families feel confident as they navigate care decisions.
                    </p>
                </header>

                {/* OUR PROMISE */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Our Promise to You</h2>

                    <p style={styles.p}>
                        ICare is a marketplace, not a care provider. We do not employ caregivers,
                        arrange care on your behalf, or deliver care services directly. Instead,
                        we focus on creating a safe, transparent environment where individuals can
                        connect, communicate, and decide what works best for their needs.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        This means families decide who they want to speak to, interview, and hire —
                        and caregivers choose the work that fits them. Hours, duties, start dates,
                        and pay are agreed directly between the people involved.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        We support safer decisions by providing platform safeguards, clear guidance,
                        and tools to report concerns. Any verification or profile information
                        available on ICare is intended to support transparency and informed choice,
                        but it does not replace personal judgment, interviews, or due diligence by
                        users.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Tip: keep early conversations on ICare, ask questions, and take your time
                        before agreeing to anything.
                    </p>
                </section>

                {/* CAREGIVER PROFILES */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Caregiver Profiles</h2>

                    <p style={styles.p}>
                        Caregivers on ICare create profiles describing their experience,
                        availability, location, and the types of care they offer. We encourage
                        caregivers to keep this information accurate and up to date so families
                        can make informed choices.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Families can use profiles to compare fit and ask the right questions —
                        for example, what type of support is offered (personal care,
                        companionship, mobility support, overnight presence, household help),
                        what availability looks like, and what boundaries the caregiver has.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Profile information is provided by caregivers themselves. Families are
                        encouraged to request interviews, references, and relevant documentation
                        where appropriate.
                    </p>
                </section>

                {/* VERIFICATION */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Verification and Platform Safeguards</h2>

                    <p style={styles.p}>
                        ICare provides safeguards designed to encourage transparency and respectful
                        behaviour. These include secure on-platform messaging, profile prompts that
                        support clear information, and tools to block or report users.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Some caregivers may choose to share documents such as references,
                        certifications, or background checks. ICare does not independently verify
                        all information shared by users and encourages both families and caregivers
                        to conduct their own checks before agreeing to care.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Platform safeguards help reduce risk, but they cannot guarantee outcomes or
                        replace careful decision-making by users.
                    </p>
                </section>

                {/* STAYING SAFE */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Staying Safe: Practical Guidance</h2>

                    <p style={styles.p}>
                        Small steps can make a big difference. Below are practical recommendations
                        commonly used across trusted care marketplaces.
                    </p>

                    <div style={styles.spacer} />

                    <h3 style={styles.h3}>For families and care receivers:</h3>
                    <ul style={styles.checklist}>
                        <TickItem>Arrange a video or phone call before meeting in person.</TickItem>
                        <TickItem>Ask for relevant documents where appropriate (ID, references, DBS, certifications).</TickItem>
                        <TickItem>Agree duties, hours, start date, and pay clearly before care begins.</TickItem>
                        <TickItem>For early meetings, involve a family member or trusted person.</TickItem>
                        <TickItem>Be cautious of pressure tactics or requests for upfront payments.</TickItem>
                    </ul>

                    <div style={styles.spacer} />

                    <h3 style={styles.h3}>For caregivers:</h3>
                    <ul style={styles.checklist}>
                        <TickItem>Confirm care needs, schedule, and expectations before accepting work.</TickItem>
                        <TickItem>Agree terms clearly and keep a written record of key details.</TickItem>
                        <TickItem>Keep communication on ICare until trust is established.</TickItem>
                        <TickItem>Avoid sharing sensitive documents outside the platform.</TickItem>
                        <TickItem>Trust your instincts if something feels unclear or unsafe.</TickItem>
                    </ul>
                </section>

                {/* REPORTING */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Reporting Concerns</h2>

                    <p style={styles.p}>
                        If something does not feel right, we encourage users to trust their instincts.
                        ICare provides ways to report concerns, inappropriate behaviour, or suspected
                        misuse of the platform so that issues can be reviewed.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        Please report immediately if you notice requests for upfront payments,
                        pressure to move conversations off-platform, harassment, discrimination,
                        or suspected impersonation.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        In case of emergency or immediate danger, contact local emergency services.
                        ICare cannot provide emergency response.
                    </p>
                </section>

                {/* PRIVACY */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Privacy and Data Protection</h2>

                    <p style={styles.p}>
                        We respect the privacy of everyone using ICare. Personal information is
                        collected only to support core platform functionality such as account
                        creation, communication between users, and safety-related features. We do
                        not sell personal data to third parties.
                    </p>

                    <div style={styles.spacer} />

                    <p style={styles.p}>
                        We follow data minimisation and purpose limitation principles: we collect
                        what is necessary, use it to operate the platform and support safety, and
                        restrict access to authorised systems and staff.
                    </p>
                </section>

                {/* DISCLAIMER */}
                <section style={styles.section}>
                    <h2 style={styles.h2}>Important Disclaimer</h2>

                    <p style={styles.p}>
                        ICare does not provide medical, legal, or professional care advice and does
                        not deliver care services. Users are responsible for conducting their own
                        due diligence and making decisions appropriate to their individual
                        circumstances. In case of emergency, always contact local emergency services.
                    </p>
                </section>
            </section>

            <ICareFooter />
        </>
    );
}
