import type { ButtonHTMLAttributes } from "react";
import styles from "./CartButton.module.scss";
import cartIcon from "../../assets/icons/cart.svg";

type CartButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  count?: number;
};

function CartButton({ count = 0, className = "", ...props }: CartButtonProps) {
  return (
    <button
      className={`${styles.cartButton} ${className}`}
      aria-label={`Shopping cart with ${count} items`}
      {...props}
    >
      <img
        src={cartIcon}
        alt="Shopping Cart"
        className={styles.cartIcon}
        loading="lazy"
      />
      <span className={styles.cartCounter}>{count}</span>
    </button>
  );
}

export default CartButton;
