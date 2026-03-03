import AdminReportedIssues from "./adm-reported-issues";

export default function Incidents() {
    return (
        <AdminReportedIssues
            title="Incident Reports"
            description="Incident queue for flagged chat content requiring moderation review."
            fixedSource="flagged_message"
        />
    );
}
