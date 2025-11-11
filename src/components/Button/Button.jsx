import React from "react";
import styles from "./Button.module.scss";

function Button({
  children,
  disabled = false,
  type = "button",
  variant = "primary",
  active = false,
  className,
  ...rest
}) {
  const buttonClass = [
    styles.button,
    variant === "secondary" && styles.secondary,
    variant === "seeMore" && styles.seeMore,
    variant === "secondary" && active && styles.active,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
