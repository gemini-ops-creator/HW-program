import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import styles from "./HomePage.module.css";
import { useLanguage } from "../../context/LanguageContext";
import { homeTranslations } from "../../locales/home";

import heroImage from "../../assets/background/home.png";
import trustpilotImage from "../../assets/background/trustpilot.svg";

function HomePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const content = homeTranslations[language];

  return (
    <div className={styles.homeContainer}>
      <Header />
      <main className={styles.heroSection}>
        <div className={styles.heroBanner}>
          <div className={styles.heroLeftSide}>
            <h1 className={styles.mainTitle}>
              <div>{content.titleLine1}</div>
              <div>{content.titleLine2}</div>
              <div>
                <span className={styles.highlightText}>
                  {content.titleHighlight}
                </span>{" "}
                {content.titleLine3Suffix}
              </div>
            </h1>
            <p className={styles.subtitleText}>{content.subtitle}</p>
            <div className={styles.actionArea}>
              <Button onClick={() => navigate("/order")}>
                {content.orderButton}
              </Button>
            </div>
            <div className={styles.ratingArea}>
              <img
                src={trustpilotImage}
                alt={content.trustpilotAlt}
                className={styles.reviewLogo}
              />
              <div className={styles.reviewStats}>
                <div className={styles.starRating}>
                  <div className={`${styles.star} ${styles.filled}`}></div>
                  <div className={`${styles.star} ${styles.filled}`}></div>
                  <div className={`${styles.star} ${styles.filled}`}></div>
                  <div className={`${styles.star} ${styles.filled}`}></div>
                  <div className={`${styles.star} ${styles.halfFilled}`}></div>
                </div>
                <span className={styles.ratingText}>{content.ratingText}</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRightSide}>
            <img
              src={heroImage}
              alt={content.heroImageAlt}
              className={styles.foodImage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
