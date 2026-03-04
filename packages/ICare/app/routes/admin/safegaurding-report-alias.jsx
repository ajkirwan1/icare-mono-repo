import { Navigate, useParams } from "react-router";

export default function AdminSafegaurdingReportAlias() {
    const params = useParams();
    const reportId = String(params.reportId || "").trim();

    if (!reportId) {
        return <Navigate to="/admin/safeguarding" replace />;
    }

    return <Navigate to={`/admin/safeguarding/${encodeURIComponent(reportId)}`} replace />;
}
