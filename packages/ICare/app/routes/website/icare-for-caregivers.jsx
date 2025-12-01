import { useEffect, useRef } from "react";
import ICareForCaregiversHero from "../../components/website/pages/caregivers/ICareForCaregiversHero";
import CaregiverSteps from "../../components/website/pages/caregivers/CaregiverSteps";
import WhoCanJoin from "../../components/website/pages/caregivers/WhoCanJoin";
import CaregiverFAQ from "../../components/website/pages/caregivers/CaregiverFAQ";
import ContactCTA from "../../components/website/pages/caregivers/ContactCTA";

export default function ICareForCaregivers() {

    const NEUTRAL = "#0F172A";
    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    const stepRefs = useRef([]);
    useEffect(() => {
        const els = stepRefs.current.filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("reveal--in");
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);


    return (
        <div style={pageWrap}>
            <ICareForCaregiversHero />
            <CaregiverSteps />
            <WhoCanJoin />
            <CaregiverFAQ />
            <ContactCTA />
        </div>
    );
}
