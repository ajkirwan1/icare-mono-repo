import { Link } from "react-router";
import PrivacyHero from "../../components/website/pages/privacy/PrivacyHero";
import PrivacyTOC from "../../components/website/pages/privacy/PrivacyTOC";
import PrivacyCoreCards from "../../components/website/pages/privacy/PrivacyCoreCards";
import PrivacyRetentionTable from "../../components/website/pages/privacy/PrivacyRetentionTable";
import PrivacyAccordion from "../../components/website/pages/privacy/PrivacyAccordion";
import CookieSettingsPanel from "../../components/website/pages/privacy/PrivacyCookieSettings";
import DSARFormMailto from "../../components/website/pages/privacy/PrivacyDSARForm";
import PrivacyDPOContact from "../../components/website/pages/privacy/PrivacyDPOContact";


export default function Privacy() {
    const pageFont = { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" };

    return (
        <div style={pageFont}>
            <PrivacyHero />
            <PrivacyTOC />
            <PrivacyCoreCards />
            <PrivacyRetentionTable />
            <PrivacyAccordion />
            <CookieSettingsPanel />
            <DSARFormMailto />
            <PrivacyDPOContact />
            {/* ===== FOOTER ===== */}
            <footer
                style={{
                    borderTop: "1px solid #e2e8f0",
                    padding: "2.5rem 2rem",
                    fontSize: ".8rem",
                    color: "#64748b",
                    background: "#fff",
                    marginTop: "0",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        gap: ".75rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <li>
                        <Link to="/" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/how-it-works" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            How it Works
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 800 }}>
                            Privacy
                        </Link>
                    </li>
                </ul>
                <div style={{ marginTop: ".75rem", textAlign: "center" }}>
                    © {new Date().getFullYear()} ICare. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
