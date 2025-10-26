import React from "react";
import styles from "./CartButton.module.scss";
import cartIcon from "../../assets/icons/cart.svg";

function CartButton({ count = 0, onClick, className = "", ...props }) {
  return (
    <button
      className={`${styles.cartButton} ${className}`}
      onClick={onClick}
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
