import styles from "./analytics.module.scss";
import Card from "~/components/application/data-display/card/card";
import {
  FaUsers,
  FaCalendarCheck,
  FaPoundSign,
  FaReceipt,
  FaChartLine,
  FaClipboardList,
  FaClock,
  FaShieldAlt,
  FaFingerprint,
  FaStar,
  FaHandshake,
  FaCommentDots
} from "react-icons/fa";

export default function Analytics() {
  return (
    <div>
      <h1>Admin Analytics</h1>
      <p>Business intelligence and platform performance - last 30 days</p>
      <section>
        <h2>Key Metrics</h2>
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "40px" }}>
          <Card title={"Total Users"} icon={<FaUsers />}>
            <div>234</div>
            <div style={{ color: "green" }}>↑ 15% from last month</div>
          </Card>
          <Card title={"Total Bookings"} icon={<FaCalendarCheck />}>
            <div>156</div>
            <div style={{ color: "orange" }}>→ 0% from last month</div>
          </Card>
          <Card title={"Revenue (GMV)"} icon={<FaPoundSign />}>
            <div>£12,345</div>
            <div style={{ color: "green" }}>↑ 15% from last month</div>
          </Card>
          <Card title={"Platform fees"} icon={<FaReceipt />}>
            <div>£560</div>
            <div style={{ color: "red" }}>↓ 8% from last month</div>
          </Card>
        </div>
      </section>
      <section>
        <h2>Operational Performance</h2>
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Card
            title={"Registration Trends"}
            subtitle={"Carereceivers vs caregivers over time"}
            icon={<FaChartLine />}
            cta={"Review Now"}>
            <div>
              <dl className={styles.statsList}>
                <dt>Care Receivers:</dt>
                <dd>12</dd>
                <dt>Caregivers:</dt>
                <dd>50</dd>
                <dt>Familiy members:</dt>
                <dd>12</dd>
              </dl>
            </div>
          </Card>
          <Card title={"Booking performance"} subtitle={"Outcomes breakdown"} icon={<FaClipboardList />}>
            <div>
              <dl className={styles.statsList}>
                <dt>Completed:</dt>
                <dd>12</dd>
                <dt>Cancelled:</dt>
                <dd>50</dd>
                <dt>Disputed:</dt>
                <dd>12</dd>
                <dt>In progress:</dt>
                <dd>12</dd>
              </dl>
            </div>
          </Card>
        </div>
      </section>
      <section>
        <h2>Service Quality</h2>
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "40px" }}>
          <Card title={"Average review time"} subtitle={"22 hours"} icon={<FaClock />} />
          <Card title={"SLA compliance"} subtitle={"96%"} icon={<FaShieldAlt />} />
          <Card title={"DBS uptake"} subtitle={"30%"} icon={<FaFingerprint />} />
          <Card title={"Average caregiver rating"} subtitle={"4.2"} icon={<FaStar />} />
          <Card title={"Acceptance rates"} subtitle={"96%"} icon={<FaHandshake />} />
          <Card title={"Review rates"} subtitle={"30%"} icon={<FaCommentDots />} />
        </div>
      </section>
    </div>
  );
}
