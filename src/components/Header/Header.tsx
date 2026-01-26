import Logo from "../Logo/Logo";
import CartButton from "../CartButton/CartButton";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { commonTranslations } from "../../locales/common";

function Header() {
  const navigate = useNavigate();
  const cart = useAppSelector(state => state.cart.items);
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const content = commonTranslations[language];

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [styles.navItem, isActive ? styles.activeNavItem : ""]
      .filter(Boolean)
      .join(" ");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const themeOptions = ["light", "dark"] as const;
  const themeLabels = {
    light: content.header.theme.light,
    dark: content.header.theme.dark,
  };

  return (
    <header className={styles.appHeader}>
      <Link className={styles.logoLink} aria-label="Homepage" to="/">
        <Logo alt="Company Logo" className={styles.logoIcon} />
      </Link>

      <nav className={styles.navContainer}>
        <div className={styles.navLinks}>
          <NavLink to="/" end className={navLinkClassName}>
            {content.header.home}
          </NavLink>
          <NavLink to="/menu" className={navLinkClassName}>
            {content.header.menu}
          </NavLink>
          <span className={styles.navItem} style={{ cursor: "default" }}>
            {content.header.company}
          </span>
          <NavLink to="/login" className={navLinkClassName}>
            {content.header.login}
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
              aria-label={themeLabels[option]}
              onClick={() => setTheme(option)}
            >
              {themeLabels[option]}
            </button>
          ))}
        </div>

        <LanguageDropdown />

        <div className={styles.cartButtonWrapper}>
          <CartButton count={totalItems} onClick={() => navigate("/order")} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
