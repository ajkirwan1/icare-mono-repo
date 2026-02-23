import Card from "~/components/application/data-display/card/card";
import { Form } from "react-router";
import { FaUsers, FaCalendarCheck, FaBan, FaUserPlus } from "react-icons/fa";
import SubmitButton from "~/components/website/common/buttons/submit-buttons/submit-button";

export default function Users() {
  return (
    <>
      <h1>User Management</h1>
      <p>View and manage all platform users</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        <Card title={"Total Users"} icon={<FaUsers />} />
        <Card title={"Total bookings"} icon={<FaCalendarCheck />} />
        <Card title={"Suspended Users"} icon={<FaBan />} />
        <Card title={"New users this week"} icon={<FaUserPlus />} />
      </div>
      <div role="toolbar" aria-label="Search and filter tollbar" style={{ marginTop: "40px", border: "1px solid #ccc", padding: "20px", borderRadius: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
        <Form method="get" role="search" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <input placeholder="input" />
          <select name="Role">
            <option value="">All Roles</option>
            <option value="admin">Caregiver</option>
            <option value="user">Carerecevier</option>
            <option value="user">Family</option>
          </select>
          <select name="Status">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </div>
    </>
  );
}
