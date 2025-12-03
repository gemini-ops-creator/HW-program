import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./OrderPage.module.css";

function OrderPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.title}>Order</h1>
        <p className={styles.subtitle}>
          Protected order flow will be implemented here.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default OrderPage;
