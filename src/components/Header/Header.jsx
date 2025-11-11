import React from "react";
import Logo from "../Logo/Logo.jsx";
import CartButton from "../CartButton/CartButton.jsx";
import styles from "./Header.module.scss";
import { useAppContext } from "../../context/AppContext.jsx";

function Header() {
  const { cart, toggleCart, setCurrentPage } = useAppContext();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.appHeader}>
      <div
        className={styles.logoLink}
        aria-label="Homepage"
        style={{ cursor: "pointer" }}
      >
        <Logo alt="Company Logo" className={styles.logoIcon} />
      </div>

      <nav className={styles.navContainer}>
        <div className={styles.navLinks}>
          <span className={styles.navItem} style={{ cursor: "default" }}>
            Home
          </span>
          <span
            className={styles.navItem}
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentPage && setCurrentPage("menu")}
          >
            Menu
          </span>
          <span className={styles.navItem} style={{ cursor: "default" }}>
            Company
          </span>
          <span className={styles.navItem} style={{ cursor: "default" }}>
            Login
          </span>
        </div>

        <div className={styles.cartButtonWrapper}>
          <CartButton count={totalItems} onClick={toggleCart} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
