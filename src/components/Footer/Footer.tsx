import styles from "./Footer.module.scss";
import Logo from "../Logo/Logo";
import {
  FooterText,
  FooterLinkTitle,
  FooterLink,
  FooterCredits,
} from "../Typography/Typography";
import instagramIcon from "../../assets/icons/instagram.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";

type FooterLinkItem = {
  text: string;
  href?: string;
  disabled: boolean;
};

type FooterLinkColumn = {
  title: string;
  links: FooterLinkItem[];
};

const footerLinksConfig: FooterLinkColumn[] = [
  {
    title: "COMPANY",
    links: [
      { text: "About Us", disabled: true },
      { text: "Careers", disabled: true },
      { text: "Contact", disabled: true },
    ],
  },
  {
    title: "TEMPLATE",
    links: [
      { text: "Style Guide", href: "https://www.google.com", disabled: false },
      { text: "Changelog", href: "https://www.google.com", disabled: false },
      { text: "License", href: "https://www.google.com", disabled: false },
    ],
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <div className={styles.logoSection}>
            <Logo alt="Restaurant Logo" className={styles.logo} />
            <FooterText className={styles.footerText}>
              Takeaway & Delivery template for small - medium businesses.
            </FooterText>
          </div>

          <div className={styles.linksContainer}>
            {footerLinksConfig.map((column, columnIndex) => (
              <div key={columnIndex} className={styles.linkColumn}>
                <FooterLinkTitle className={styles.linkTitle}>
                  {column.title}
                </FooterLinkTitle>
                {column.links.map((link, linkIndex) => (
                  <FooterLink
                    key={linkIndex}
                    href={link.href}
                    disabled={link.disabled}
                    className={`${styles.link} ${
                      link.disabled ? styles.disabledLink : ""
                    }`}
                  >
                    {link.text}
                  </FooterLink>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomContent}>
          <FooterCredits className={styles.builtWith}>
            <span>Built by</span>
            <span className={styles.highlightedText}>Flowbase</span>
            <span>· Powered by</span>
            <span className={styles.highlightedText}>Webflow</span>
          </FooterCredits>
          <div className={styles.socialIcons}>
            <span
              className={styles.socialIcon}
              style={{ cursor: "default" }}
              aria-label="Instagram"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className={styles.iconImage}
                loading="lazy"
              />
            </span>
            <span
              className={styles.socialIcon}
              style={{ cursor: "default" }}
              aria-label="Twitter"
            >
              <img
                src={twitterIcon}
                alt="Twitter"
                className={styles.iconImage}
                loading="lazy"
              />
            </span>
            <span
              className={styles.socialIcon}
              style={{ cursor: "default" }}
              aria-label="YouTube"
            >
              <img
                src={youtubeIcon}
                alt="YouTube"
                className={styles.iconImage}
                loading="lazy"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
