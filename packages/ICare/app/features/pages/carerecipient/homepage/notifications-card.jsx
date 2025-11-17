import Card from "../../../../components/application/data-display/card/card";
import "react-circular-progressbar/dist/styles.css";
import NotificationsLabel from "../../../../components/application/ui/notifications-label/notifications-label";

export default function NotificationsCard() {

  return (
    <Card title="My Notifications" subtitle="Notifications">
      {/* <NotificationsLabel /> */}
      <div>Upload documents to speed up verification.</div>
    </Card>);
}
