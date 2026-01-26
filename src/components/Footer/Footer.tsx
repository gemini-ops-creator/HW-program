import styles from "./Footer.module.scss";
import Logo from "../Logo/Logo";
import {
  FooterText,
  FooterLinkTitle,
  FooterLink,
  FooterCredits,
} from "../Typography/Typography";
import { useLanguage } from "../../context/LanguageContext";
import { commonTranslations } from "../../locales/common";
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

function Footer() {
  const { language } = useLanguage();
  const content = commonTranslations[language];

  const footerLinksConfig: FooterLinkColumn[] = [
    {
      title: content.footer.columns.company,
      links: [
        { text: content.footer.links.about, disabled: true },
        { text: content.footer.links.careers, disabled: true },
        { text: content.footer.links.contact, disabled: true },
      ],
    },
    {
      title: content.footer.columns.template,
      links: [
        {
          text: content.footer.links.style,
          href: "https://www.google.com",
          disabled: false,
        },
        {
          text: content.footer.links.changelog,
          href: "https://www.google.com",
          disabled: false,
        },
        {
          text: content.footer.links.license,
          href: "https://www.google.com",
          disabled: false,
        },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.mainContent}>
          <div className={styles.logoSection}>
            <Logo alt="Restaurant Logo" className={styles.logo} />
            <FooterText className={styles.footerText}>
              {content.footer.description}
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
            <span>{content.footer.credits.builtBy}</span>
            <span className={styles.highlightedText}>Flowbase</span>
            <span>· {content.footer.credits.poweredBy}</span>
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
