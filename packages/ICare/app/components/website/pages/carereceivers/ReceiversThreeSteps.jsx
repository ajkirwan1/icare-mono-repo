import ReceiversThreeStepsSection from "./three-steps/ReceiversThreeStepsSection";
import ReceiversThreeStepsHeader from "./three-steps/ReceiversThreeStepsHeader";
import ReceiversStepsGrid from "./three-steps/ReceiversStepsGrid";
import ReceiversStepItem from "./three-steps/ReceiversStepItem";
import ReceiversStepsCTA from "./three-steps/ReceiversStepsCTA";

export default function ReceiversThreeSteps() {
    const steps = [
        {
            n: "1",
            t: "Browse verified caregivers",
            d: "Review experience, languages, skills and availability — all clearly laid out."
        },
        {
            n: "2",
            t: "Start a private conversation",
            d: "Message directly, ask questions and exchange documents securely."
        },
        {
            n: "3",
            t: "Agree terms together",
            d: "Set hours, expectations and rate — transparent, simple and human."
        }
    ];

    return (
        <ReceiversThreeStepsSection>
            <ReceiversThreeStepsHeader />

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

            <ReceiversStepsCTA />
        </ReceiversThreeStepsSection>
    );
}
