import ReceiversThreeStepsSection from "./three-steps/ReceiversThreeStepsSection";
import ReceiversThreeStepsHeader from "./three-steps/ReceiversThreeStepsHeader";
import ReceiversStepsGrid from "./three-steps/ReceiversStepsGrid";
import ReceiversStepItem from "./three-steps/ReceiversStepItem";
import ReceiversStepsCTA from "./three-steps/ReceiversStepsCTA";

export default function ReceiversThreeSteps() {
    const steps = [
        {
            n: "1",
            t: "Browse trusted caregivers",
            d: "Explore experience, skills and availability — presented clearly so you can compare at a glance."
        },
        {
            n: "2",
            t: "Connect privately",
            d: "Message caregivers directly, ask questions and get a real sense of who feels right for your family."
        },
        {
            n: "3",
            t: "Agree the plan together",
            d: "Set hours, expectations and rate — openly, transparently and at your own pace."
        }
    ];

    return (
        <ReceiversThreeStepsSection>

            {/* HEADER with updated Airbnb/Norfolk-style copy */}
            <ReceiversThreeStepsHeader
                title="Find your caregiver in 3 simple steps"
                subtitle="A calm, human-centered process designed for clarity, trust and ease."
            />

            <ReceiversStepsGrid>
                {steps.map((s, i) => (
                    <ReceiversStepItem
                        key={s.n}
                        number={s.n}
                        title={s.t}
                        description={s.d}
                        delay={0.15 + i * 0.15}
                    />
                ))}
            </ReceiversStepsGrid>

            <ReceiversStepsCTA label="Find a caregiver" />

        </ReceiversThreeStepsSection>
    );
}
