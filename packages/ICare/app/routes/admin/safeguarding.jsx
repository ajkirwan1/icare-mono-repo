import AdminReportedIssues from "./adm-reported-issues";

export default function Safeguarding() {
    return (
        <AdminReportedIssues
            title="Safeguarding Queue"
            description="Safeguarding-first moderation events with potential abuse, risk or policy breach indicators."
            fixedSource="moderation_event"
        />
    );
}
