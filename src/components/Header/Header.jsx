import React from "react";
import Logo from "../Logo/Logo.jsx";
import CartButton from "../CartButton/CartButton.jsx";
import styles from "./Header.module.scss";

function Header() {
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
          <span className={styles.navItem} style={{ cursor: "pointer" }}>
            Home
          </span>
          <span className={styles.navItem} style={{ cursor: "pointer" }}>
            Menu
          </span>
          <span className={styles.navItem} style={{ cursor: "pointer" }}>
            Company
          </span>
          <span className={styles.navItem} style={{ cursor: "pointer" }}>
            Login
          </span>
        </div>

        <div className={styles.cartButtonWrapper}>
          <CartButton count={0} onClick={() => console.log("Cart clicked")} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
