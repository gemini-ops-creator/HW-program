import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./HomePage.module.css";

import bgShape from "../../assets/background/BG_Shape.png";
import heroImage from "../../assets/background/home.png";
import trustpilotImage from "../../assets/background/trustpilot.svg";

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <main
        className={styles.heroSection}
        style={{ backgroundImage: `url(${bgShape})` }}
      >
        <div className={styles.heroBanner}>
          <div className={styles.heroLeftSide}>
            <h1 className={styles.mainTitle}>
              <div>Beautiful food</div>
              <div>& takeaway,</div>
              <div>
                <span className={styles.highlightText}>delivered</span> to your
                door.
              </div>
            </h1>
            <p className={styles.subtitleText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
            <div className={styles.actionArea}>
              <Button disabled title="Online ordering will be available soon">
                Place an Order
              </Button>
              <p className={styles.actionNote}>
                Online ordering is temporarily unavailable. Stay tuned!
              </p>
            </div>
            <div className={styles.ratingArea}>
              <img
                src={trustpilotImage}
                alt="Review Platform Logo"
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
                <span className={styles.ratingText}>
                  from over 2000+ reviews
                </span>
              </div>
            </div>
          </div>
          <div className={styles.heroRightSide}>
            <img
              src={heroImage}
              alt="Delicious Food"
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
