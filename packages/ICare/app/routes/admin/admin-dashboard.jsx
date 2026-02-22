import Card from "~/components/application/data-display/card/card";
import styles from "./admin-dashboard.module.scss";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const footerLinks = [
  { to: "/admin/verification-queue", label: "Review queue" }
  // Add more links as needed
];

export default function AdminDashboard() {
  return (
    <>
      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#FEE2E2", border: "1px solid #ffcccc", borderRadius: "4px" }}>
        <p><FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#991B1B" }} /> URGENT SAFEGUARDING REPORT</p>
        <p>Report #SR-00423 submitted 35 minutes ago requires immediate review</p>
        <NavLink to="/admin/safeguarding-reports/4" className={styles.safeguardingLink}>Review Report Now</NavLink>
      </div>
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <Card title={"Verification Queue"}
            subtitle={"Caregivers awaiting admin review"}
            cta={"Review Now"}
            footerLinks={footerLinks}>
            <div className={styles.container}>
              <div>
                <dl className={styles.statsList}>
                  <dt>Pending Verifications:</dt>
                  <dd>12 Caregivers</dd>
                  <dt>Identity:</dt>
                  <dd>8 pending</dd>
                  <dt>DBS (voluntary):</dt>
                  <dd>8 pending</dd>
                </dl>
              </div>
              <div>
                <div className={`${styles.slaStatus} ${styles.warning}`}>SLA Warning</div>
                <div className={`${styles.slaStatus} ${styles.healthy}`}>SLA Healthy</div>
                <div className={`${styles.slaStatus} ${styles.breached}`}>SLA Breached</div>
                <dl className={styles.statsList}>
                  <dt>Average wait time:</dt>
                  <dd>4 hours</dd>
                </dl>
              </div>
            </div>
          </Card>
          <Card title={"Safeguarding Reports"}
            subtitle={"Active safety concerns requiring attention"}
            cta={"View Reports"}
            footerLinks={footerLinks}>
            <div className={styles.container}>
              <div>
                <dl className={styles.statsList}>
                  <dt>Active Reports:</dt>
                  <dd>2 cases</dd>
                </dl>
              </div>
              <div>
                <div className={`${styles.slaStatus} ${styles.warning}`}>Urgent (High Severity)</div>
                <div className={`${styles.slaStatus} ${styles.healthy}`}>Healthy</div>
                <div className={`${styles.slaStatus} ${styles.breached}`}>Critical</div>
                <ol className={styles.timeline}>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}>Report #SR-00421 resolved (outcome: no action)</p>
                      <time className={styles.timelineTime}>Feb 6</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}>Report #SR-00420 escalated to SAB</p>
                      <time className={styles.timelineTime}>Feb 5</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}>Report #SR-00419 resolved (user suspended)</p>
                      <time className={styles.timelineTime}>Feb 3</time>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </Card>
          <Card title={"Recent Activity"}
            subtitle={"Last 24 hours"}
            cta={"View full Audit Log"}>
            <div className={styles.container}>
              <div>
                <select className={styles.filter}>
                  <option value="all">All Events</option>
                  <option value="verifications">Verifications</option>
                  <option value="safeguarding">Safeguarding</option>
                  <option value="bookings">Bookings</option>
                </select>
                <ol className={styles.timeline}>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}><strong>Admin Sarah</strong> approved caregiver verification: John Smith (#4523)</p>
                      <time className={styles.timelineTime}>Today, 14:32</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}>Booking #7821 completed successfully (Jane D. → Mary K.)</p>
                      <time className={styles.timelineTime}>Today, 14:15</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}><strong>Admin Sarah</strong> rejected caregiver verification: David Jones (#4522) — ID expired</p>
                      <time className={styles.timelineTime}>Today, 13:47</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}>Dispute raised on Booking #7803 by Tom H.</p>
                      <time className={styles.timelineTime}>Today, 12:05</time>
                    </div>
                  </li>
                  <li>
                    <span className={styles.timelineDot} />
                    <div>
                      <p className={styles.timelineText}><strong>Admin Sarah</strong> resolved dispute on Booking #7789 — Partial refund (50%)</p>
                      <time className={styles.timelineTime}>Today, 11:23</time>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.rightColumn}>
          <Card title={"Platform Overview"}
            subtitle={"Key metrics"}>
            <div className={styles.container}>
              <div>
                <dl className={styles.statsList}>
                  <dt>Total Users:</dt>
                  <dd>1,247</dd>
                  <dt>Active Caregivers:</dt>
                  <dd>89</dd>
                  <dt>Active Care Receivers:</dt>
                  <dd>156</dd>
                </dl>
              </div>
            </div>
          </Card>
          <Card title={"Bookings"}
            subtitle={"This week"}>
            <div className={styles.container}>
              <div>
                <dl className={styles.statsList}>
                  <dt>New Bookings:</dt>
                  <dd>23</dd>
                  <dt>Completed:</dt>
                  <dd>18</dd>
                  <dt>Cancelled:</dt>
                  <dd>2</dd>
                </dl>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
