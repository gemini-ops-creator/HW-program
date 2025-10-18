import React from "react";
import styles from "./Footer.module.css";
import restaurantLogo from "../../assets/icons/logo.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.mainContent}>
                    <div className={styles.logoSection}>
                        <img
                            src={restaurantLogo}
                            alt="Restaurant Logo"
                            className={styles.logo}
                            loading="lazy"
                        />
                        <p className={styles.footerText}>
                            Takeaway & Delivery template for small - medium businesses.
                        </p>
                    </div>

                    <div className={styles.linksContainer}>
                        <div className={styles.linkColumn}>
                            <h4 className={styles.linkTitle}>COMPANY</h4>
                            <span className={`${styles.link} ${styles.disabledLink}`} style={{ cursor: "default" }}>
                                About Us
                            </span>
                            <span className={`${styles.link} ${styles.disabledLink}`} style={{ cursor: "default" }}>
                                Careers
                            </span>
                            <span className={`${styles.link} ${styles.disabledLink}`} style={{ cursor: "default" }}>
                                Contact
                            </span>
                        </div>
                        <div className={styles.linkColumn}>
                            <h4 className={styles.linkTitle}>TEMPLATE</h4>
                            <a href="#" className={styles.link} target="_blank" rel="noopener noreferrer">
                                Style Guide
                            </a>
                            <a href="#" className={styles.link} target="_blank" rel="noopener noreferrer">
                                Changelog
                            </a>
                            <a href="#" className={styles.link} target="_blank" rel="noopener noreferrer">
                                License
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomContent}>
                    <div className={styles.builtWith}>
                        <span>Built by</span>
                        <span className={styles.highlightedText} style={{ cursor: "default" }}>
                            Flowbase
                        </span>
                        <span>· Powered by</span>
                        <span className={styles.highlightedText} style={{ cursor: "default" }}>
                            Webflow
                        </span>
                    </div>
                    <div className={styles.socialIcons}>
                        <span className={styles.socialIcon} style={{ cursor: "default" }} aria-label="Instagram">
                            <img src={instagramIcon} alt="Instagram" className={styles.iconImage} loading="lazy" />
                        </span>
                        <span className={styles.socialIcon} style={{ cursor: "default" }} aria-label="Twitter">
                            <img src={twitterIcon} alt="Twitter" className={styles.iconImage} loading="lazy" />
                        </span>
                        <span className={styles.socialIcon} style={{ cursor: "default" }} aria-label="YouTube">
                            <img src={youtubeIcon} alt="YouTube" className={styles.iconImage} loading="lazy" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
