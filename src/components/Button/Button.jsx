import React from "react";
import clsx from "clsx";
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
  const buttonClass = clsx(
    styles.button,
    {
      [styles.secondary]: variant === "secondary",
      [styles.seeMore]: variant === "seeMore",
      [styles.active]: active && variant === "secondary",
    },
    className
  );

  return (
    <button className={buttonClass} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
