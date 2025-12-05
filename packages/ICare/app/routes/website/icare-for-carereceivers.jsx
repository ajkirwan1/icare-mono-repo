import { useEffect } from "react";
import ICareForCareReceiversHero from "../../components/website/pages/carereceivers/ICareForCareReceiversHero";
import ReceiversThreeSteps from "../../components/website/pages/carereceivers/ReceiversThreeSteps";
import ReceiversEditorialBanner from "../../components/website/pages/carereceivers/ReceiversEditorialBanner";
import ReceiversChecklist from "../../components/website/pages/carereceivers/ReceiversChecklist";
import ReceiversCompareICareVsAgency from "../../components/website/pages/carereceivers/ReceiversCompareICareVsAgency";
import ReceiversFAQ from "../../components/website/pages/carereceivers/ReceiversFAQ";
import ReceiversTrustBar from "../../components/website/pages/carereceivers/ReceiversTrustBar";
import ReceiversContactCTA from "../../components/website/pages/carereceivers/ReceiversContactCTA";
import ReceiversFooter from "../../components/website/pages/shared/footers/ICareFooter";

export default function ICareForCareReceivers() {

    // === SIMPLE SCROLL REVEAL ===
    useEffect(() => {
        const items = document.querySelectorAll(".sr");
        const reveal = () => {
            items.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    el.style.opacity = 1;
                    el.style.transform = "translateY(0)";
                }
            });
        };
        reveal();
        window.addEventListener("scroll", reveal);
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    const NEUTRAL = "#0F172A";

    const pageWrap = {
        fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: NEUTRAL,
        background: "linear-gradient(180deg, #FAFCFD 0%, #FFFFFF 70%)",
    };

    return (
        <div style={pageWrap}>
            <ICareForCareReceiversHero />
            <ReceiversThreeSteps />
            <ReceiversEditorialBanner />
            <ReceiversChecklist />
            <ReceiversCompareICareVsAgency />
            <ReceiversFAQ />
            <ReceiversTrustBar />
            <ReceiversContactCTA />
            <ReceiversFooter />
        </div>
    );
}
