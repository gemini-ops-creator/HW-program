import React from "react";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import CartButton from "../CartButton/CartButton.jsx";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const cart = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const navLinkClassName = ({ isActive }) =>
    [styles.navItem, isActive ? styles.activeNavItem : ""]
      .filter(Boolean)
      .join(" ");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
