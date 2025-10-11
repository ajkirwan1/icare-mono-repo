import FilterControls from "../ui/filter/filter-controls-component";
import ScrollableMessageList from "./scrollable-message-list-component";
import styles from "../../styles/components/messages/messages-sidebar.module.scss";

export default function MessagesSidebar({ threads }) {
  return (
    <div className={styles.leftColumn}>
      <h2>Recent messages</h2>
      <FilterControls />
      <ScrollableMessageList threads={threads} />
    </div>
  );
}
