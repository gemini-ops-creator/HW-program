import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./MenuPage.module.css";
import { useMealsService } from "../../services/ApiService.js";
import { useAppContext } from "../../context/AppContext.jsx";

import bgShape from "../../assets/background/BG_Shape.png";

function Menu() {
  const [displayLimit, setDisplayLimit] = useState(6);
  const [activeCategory, setActiveCategory] = useState("Dessert");

  const { setCurrentPage } = useAppContext();
  const { data: mealsData, loading, error, execute } = useMealsService();

  useEffect(() => {
    execute().catch(() => {});
  }, [execute]);

  const loadMoreItems = () => {
    setDisplayLimit(prev => prev + 6);
  };

  const meals = mealsData ?? [];
  const filteredMeals = meals.filter(meal => meal.category === activeCategory);

  const displayedMeals = filteredMeals.slice(0, displayLimit);
  const hasMoreItems = displayLimit < filteredMeals.length;

  const categories = ["Dessert", "Dinner", "Breakfast"];

  return (
    <div className={styles.menuPageContainer}>
      <Header />
      <main
        className={styles.menuSection}
        style={{ backgroundImage: `url(${bgShape})` }}
      >
        <div className={styles.menuContainer}>
          <header className={styles.menuHeader}>
            <h1>Browse our menu</h1>
            <p className={styles.menuSubtitle}>
              Use our menu to place an order online, or{" "}
              <span className={styles.phone}>phone</span> our store to place a
              pickup order. Fast and fresh food.
            </p>
            <nav className={styles.categoryNav}>
              {categories.map(category => (
                <Button
                  key={category}
                  variant="secondary"
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </nav>
          </header>

          {loading && <div className={styles.loading}>Loading menu...</div>}
          {error && (
            <div className={styles.error}>
              {error.message || "Failed to load menu items"}
            </div>
          )}

          <div className={styles.menuGrid}>
            {displayedMeals.map(meal => (
              <Card
                key={meal.id}
                id={meal.id}
                name={meal.meal}
                description={meal.instructions}
                image={meal.img}
                price={meal.price}
              />
            ))}
          </div>

          {hasMoreItems && !loading && (
            <div className={styles.loadMoreContainer}>
              <Button onClick={loadMoreItems} variant="seeMore">
                See More
              </Button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button onClick={() => setCurrentPage && setCurrentPage("home")}>
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Menu;
