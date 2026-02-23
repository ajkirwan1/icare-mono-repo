import { C } from "build/client/assets/chunk-EPOLDU6W-L3g161Wc";
import styles from "./analytics.module.scss";
import Card from "~/components/application/data-display/card/card";
export default function Analytics() {
  return (
    <div className={styles.grid}>
      <h1>Admin Analytics</h1>
      <p>Business intelligence and platform performance - last 30 days</p>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Card title={"Total Users"}>
          <div>234</div>
          <div>15% from last month</div>
        </Card>
        <Card title={"Total Bookings"}>
          <div>156</div>
          <div>15% from last month</div>
        </Card>
        <Card title={"Revenue (GMV)"}>
          <div>£12,345</div>
          <div>15% from last month</div>
        </Card>
        <Card title={"Platform fees"}>
          <div>£560</div>
          <div>15% from last month</div>
        </Card>
      </div>
      <div>
        <Card title={"User Growth"} />
        <Card title={"User Growth"} />
        <Card title={"User Growth"} />
        <Card title={"User Growth"} />
      </div>
    </div>
  );
}
