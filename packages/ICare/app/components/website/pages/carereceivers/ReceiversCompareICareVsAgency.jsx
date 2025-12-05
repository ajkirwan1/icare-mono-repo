import CompareSectionHeader from "./compare/CompareSectionHeader";
import CompareTagList from "./compare/CompareTagList";
import CompareCardGrid from "./compare/CompareCardGrid";
import CompareCard from "./compare/CompareCard";

export default function ReceiversCompareICareVsAgency() {
    return (
        <section
            aria-label="ICare vs Agency"
            style={{
                margin: "90px auto",
                width: "min(92vw,1100px)",
                background: "#FFFFFF",
                borderRadius: 24,
                padding: "80px clamp(24px,4vw,48px)",
                border: "1px solid #E5E7EB",
                boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
            }}
        >
            <CompareSectionHeader
                label="ICare vs Agencies"
                title="Why families choose ICare"
            />

            <CompareTagList
                tags={[
                    "Direct agreement",
                    "Transparent pricing",
                    "Secure messaging",
                    "Fair pay for caregivers",
                ]}
            />

            <CompareCardGrid>
                <CompareCard
                    title="ICare"
                    icon="check"
                    iconColor="#167C5F"
                    iconBg="#ECFDF5"
                    borderColor="#A7F3D0"
                    background="#F9FAFB"
                    shadow="0 8px 18px rgba(0,0,0,0.03)"
                    items={[
                        "Direct agreement with caregiver",
                        "Transparent one-time fee",
                        "Secure messaging and contracts",
                        "Fair pay for caregivers & lower family cost",
                    ]}
                />

                <CompareCard
                    title="Traditional agency"
                    icon="dash"
                    iconColor="#64748B"
                    iconBg="#F3F4F6"
                    borderColor="#D1D5DB"
                    background="#FFFFFF"
                    shadow="0 8px 20px rgba(0,0,0,0.03)"
                    items={[
                        "Intermediary in every step",
                        "Recurring fees and markups",
                        "Fragmented communication",
                        "Less pay for caregivers",
                    ]}
                />
            </CompareCardGrid>
        </section>
    );
}
