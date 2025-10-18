import React from "react";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.appHeader}>
            <div
                className={styles.logoLink}
                aria-label="Homepage"
                style={{ cursor: "pointer" }}
            >
                <img
                    src={companyLogo}
                    alt="Company Logo"
                    className={styles.logoIcon}
                    loading="lazy"
                />
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

                <div className={styles.cartIconContainer}>
                    <img
                        src={cartIcon}
                        alt="Shopping Cart"
                        className={styles.cartIcon}
                        loading="lazy"
                    />
                    <span className={styles.cartCounter}>0</span>
                </div>
            </nav>
        </header>
    );
}

export default Header;
