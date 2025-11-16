import Card from "../../../../components/application/data-display/card/card";
import "react-circular-progressbar/dist/styles.css";

export default function ContractsCard() {

  return (
    <Card title="My contracts" subtitle="Active & pending" >
      <div>
        {/* Content for My contracts will go here */}
        <p>No active or pending contracts at the moment.</p>
      </div>
    </Card>);
}
