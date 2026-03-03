import AdminReportedIssues from "./adm-reported-issues";

export default function Disputes() {
    return (
        <AdminReportedIssues
            title="Dispute Queue"
            description="Dispute-oriented cases currently sourced from low ratings and customer dissatisfaction signals."
            fixedSource="low_rating"
        />
    );
}
