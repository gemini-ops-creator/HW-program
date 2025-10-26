import React from "react";
import styles from "./Button.module.scss";

function Button({ children, disabled = false, type = "button", ...rest }) {
  return (
    <button className={styles.button} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
