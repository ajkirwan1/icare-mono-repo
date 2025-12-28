import heroImage from "/images/heros/icare-for-carereceivers.jpg";
import PageHero from "../shared/PageHero";

export default function ICareForCareReceiversHero() {
    return (
        <PageHero
            image={heroImage}
            title="Find trusted caregivers"
            description={
                <>
                    <p style={{ fontSize: "1.6rem", fontWeight: "700", marginBottom: "1rem" }}>Get personalised help for your family.</p>
                    Verified caregivers, clear terms, no agency markups.
                </>
            }
        />
    );
}
