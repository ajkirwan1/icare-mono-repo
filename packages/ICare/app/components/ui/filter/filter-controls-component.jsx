import React from "react";
import styles from "../../../styles/components/filter-controls.module.scss";

export default function FilterControls() {
  return (
    <div className={styles.filterControls}>
      <input
        type="text"
        placeholder="Filter by name or message..."
        disabled
        className={styles.filterInput}
      />
      <select disabled className={styles.filterSelect}>
        <option>All</option>
        <option>Unread</option>
        <option>Read</option>
      </select>
    </div>
  );
}
