import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { getAdminUsers, isAbortError } from "./admin-verifications-api-client";

function formatDate(value) {
    if (!value) {
        return "-";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

export default function Users() {
    const [query, setQuery] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadUsers() {
            setLoading(true);
            setError("");
            try {
                const payload = await getAdminUsers({
                    q: query,
                    role,
                    status,
                    limit: 200,
                    signal: controller.signal
                });
                setItems(Array.isArray(payload?.items) ? payload.items : []);
            } catch (loadError) {
                if (isAbortError(loadError) || controller.signal.aborted) {
                    return;
                }
                setError(loadError instanceof Error ? loadError.message : "Could not load users.");
            } finally {
                setLoading(false);
            }
        }

        loadUsers();

        return () => {
            controller.abort();
        };
    }, [query, role, status]);

    const total = items.length;
    const caregivers = useMemo(() => items.filter((item) => item?.userType === "caregiver").length, [items]);
    const careReceivers = useMemo(() => items.filter((item) => item?.userType === "care_receiver").length, [items]);
    const active = useMemo(() => items.filter((item) => item?.accountStatus === "active").length, [items]);

    return (
        <section>
            <h1>User Management</h1>
            <p>Real user records from the platform database.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(120px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Total:</strong> {total}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Caregivers:</strong> {caregivers}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Care Receivers:</strong> {careReceivers}</div>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px" }}><strong>Active:</strong> {active}</div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name or email"
                    style={{ minWidth: "240px", padding: "8px 10px" }}
                />
                <select value={role} onChange={(event) => setRole(event.target.value)} style={{ padding: "8px 10px" }}>
                    <option value="">All Roles</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="care_receiver">Care Receiver</option>
                    <option value="family">Family</option>
                    <option value="admin">Admin</option>
                </select>
                <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ padding: "8px 10px" }}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                    <option value="deactivated">Deactivated</option>
                </select>
            </div>

            {loading ? <p>Loading users...</p> : null}
            {error ? <p>{error}</p> : null}
            {!loading && !error && items.length === 0 ? <p>No users found.</p> : null}

            {!loading && !error && items.length > 0 ? (
                <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
                    <table style={{ width: "100%", minWidth: "820px", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>User</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Email</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Role</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Created</th>
                                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Last login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>
                                        <Link to={`/admin/users/${item.id}`}>
                                            {`${item.firstName || ""} ${item.lastName || ""}`.trim() || item.id || "-"}
                                        </Link>
                                    </td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.email || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.userType || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{item.accountStatus || "-"}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{formatDate(item.createdAt)}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>{formatDate(item.lastLoginAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </section>
    );
}
