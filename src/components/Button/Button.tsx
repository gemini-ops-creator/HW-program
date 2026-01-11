import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "seeMore";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  active?: boolean;
};

function Button({
  children,
  disabled = false,
  type = "button",
  variant = "primary",
  active = false,
  className,
  ...rest
}: ButtonProps) {
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
