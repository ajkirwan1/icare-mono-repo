import { NavLink } from "react-router";
import classes from "./tag.module.scss";

/**
 * @typedef {Object} TagProps
 * @property {string} [label]
 * @property {string} [to]
 */

/**
 * @param {TagProps} props
 */
export default function Tag({ label, to }) {
  if (!to) {
    return <span className={classes.tag}>{label}</span>;
  }

  return (
    <NavLink to={to} className={`${classes.tag} ${classes.link}`}>
      {label}
    </NavLink>
  );
}
