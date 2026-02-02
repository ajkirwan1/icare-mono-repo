// TO_BE_DELETED - This file is not used by any route
// import styles from "./submit-button.module.scss";
// import clsx from "clsx";
// 
// /**
//  * @typedef {"primary" | "secondary" | "tertiary"} ButtonVariant
//  */
// 
// /**
//  * @typedef {Object} SubmitButtonProps
//  * @property {React.ReactNode} children
//  * @property {ButtonVariant} [variant]
//  * @property {boolean} [disabled]  Whether the button is disabled
//  */
// 
// /**
//  * @param {SubmitButtonProps} props
//  */
// export default function SubmitButton({ children, disabled, variant = "primary" }) {
//   return (
//     <button type='submit' className={clsx(styles.button, styles[variant])} disabled={disabled}>
//       {children}
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         aria-hidden="true"
//       >
//         <path d="M5 12h14" />
//         <path d="M13 5l7 7-7 7" />
//       </svg>
//     </button>
//   );
// }
// 