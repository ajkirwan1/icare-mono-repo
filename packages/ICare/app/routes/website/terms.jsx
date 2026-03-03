import TermsHero from "~/components/website/pages/terms/terms-hero";
import TermsContent from "~/components/website/pages/terms/terms-content";
import ICareFooter from "~/components/website/pages/shared/footers/icare-footer";

export function meta() {
    return [
        { title: "ICare | Terms of Service" },
        {
            name: "description",
            content: "Read ICare Terms of Service, including Introduction & Fair Use (Non-Circumvention)."
        }
    ];
}

export const links = () => [
    { rel: "canonical", href: "https://icare-app.co.uk/terms" }
];

export default function TermsPage() {
    return (
        <>
            <TermsHero />
            <main>
                <TermsContent />
            </main>
            <ICareFooter />
        </>
    );
}
