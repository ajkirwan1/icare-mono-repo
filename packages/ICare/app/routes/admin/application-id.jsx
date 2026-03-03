import { Navigate, useParams } from "react-router";

export default function ApplicationId() {
    const params = useParams();
    const applicationId = String(params.applicationId || "").trim();

    if (applicationId) {
        return <Navigate to={`/admin/verifications/${encodeURIComponent(applicationId)}`} replace />;
    }

    return <Navigate to="/admin/verifications" replace />;
}
