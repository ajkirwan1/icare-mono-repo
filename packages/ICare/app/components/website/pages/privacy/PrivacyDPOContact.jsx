

const BRAND = "#1FAB1F";

export default function PrivacyDPOContact() {
    return (
        <section
            id="contact-dpo"
            aria-label="Contact DPO"
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                width: "100vw",
                background: BRAND,
                color: "#FFFFFF",
                fontFamily:
                    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "28px clamp(16px,4vw,32px)",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 12,
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 900,
                        fontSize: "clamp(1.1rem,2vw,1.4rem)",
                    }}
                >
                    Data Protection Contact
                </h3>

                <p
                    style={{
                        margin: 0,
                        color: "rgba(255,255,255,.94)",
                        lineHeight: 1.65,
                    }}
                >
                    Email:{" "}
                    <a
                        href="mailto:privacy@icare.example"
                        style={{
                            color: "#fff",
                            fontWeight: 800,
                            textDecoration: "underline",
                        }}
                    >
                        privacy@icare.example
                    </a>
                    <br />
                    Company: ICare Ltd., Example Street 12, 00-000 City
                    <br />
                    Last updated: {new Date().toISOString().slice(0, 10)}
                </p>
            </div>
        </section>
    );
}
