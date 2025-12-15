import React from "react";
import Logo from "../Logo/Logo.jsx";
import CartButton from "../CartButton/CartButton.jsx";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/cart/cartSlice.js";

function Header() {
  const navigate = useNavigate();
  const totalItems = useSelector(selectCartCount);

  const navLinkClassName = ({ isActive }) =>
    [styles.navItem, isActive ? styles.activeNavItem : ""]
      .filter(Boolean)
      .join(" ");

  return (
    <header className={styles.appHeader}>
      <Link className={styles.logoLink} aria-label="Homepage" to="/">
        <Logo alt="Company Logo" className={styles.logoIcon} />
      </Link>

      <nav className={styles.navContainer}>
        <div className={styles.navLinks}>
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navLinkClassName}>
            Menu
          </NavLink>
          <span className={styles.navItem} style={{ cursor: "default" }}>
            Company
          </span>
          <NavLink to="/login" className={navLinkClassName}>
            Login
          </NavLink>
        </div>

        <div className={styles.cartButtonWrapper}>
          <CartButton count={totalItems} onClick={() => navigate("/order")} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
