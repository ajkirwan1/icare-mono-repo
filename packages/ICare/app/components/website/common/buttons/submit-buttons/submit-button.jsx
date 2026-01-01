import styles from "./submit-button.module.scss";

export default function SubmitButton({ children }) {
  return (
    <button type='submit' className={styles.button}>
      {children}
    </button>
  );
}
