import Card from "../../../components/application/data-display/card/card";
import "react-circular-progressbar/dist/styles.css";

export default function MyDocumentsCard() {

  return (
    <Card
      title="My documents"
      subtitle="Basic details & account status"
      footerLinkContent="View your documents"
      footerLinkTo="/carerecipient/documents"
    >You have not uploaded any documents</Card>
  );
}
