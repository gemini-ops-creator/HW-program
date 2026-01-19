import Logo from "../Logo/Logo";
import CartButton from "../CartButton/CartButton";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { selectCartCount } from "../../features/cart/cartSlice";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "../../context/ThemeContext";

const themeOptions = ["light", "dark"] as const;

function Header() {
  const navigate = useNavigate();
  const totalItems = useAppSelector(selectCartCount);
  const { theme, setTheme } = useTheme();

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
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

        <div className={styles.themeSwitcher} role="group" aria-label="Theme">
          {themeOptions.map(option => (
            <button
              key={option}
              type="button"
              className={[
                styles.themeButton,
                theme === option ? styles.themeButtonActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={theme === option}
              aria-label={option.charAt(0).toUpperCase() + option.slice(1)}
              onClick={() => setTheme(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.cartButtonWrapper}>
          <CartButton count={totalItems} onClick={() => navigate("/order")} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
