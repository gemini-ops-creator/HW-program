import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./MenuPage.module.css";
import ApiService from "../../services/ApiService.js";
import { useAppContext } from "../../context/AppContext.jsx";

import bgShape from "../../assets/background/BG_Shape.png";

function Menu() {
  const [meals, setMeals] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeCategory = "Dessert";

  const { setCurrentPage } = useAppContext();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getMeals();
      setMeals(data);
    } catch (err) {
      setError("Failed to load menu items");
      console.error("Error fetching meals:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreItems = () => {
    setDisplayLimit(prev => prev + 6);
  };

  const filteredMeals = meals.filter(meal => {
    if (activeCategory === "Dessert") {
      return (
        meal.category === "Dessert" ||
        meal.meal?.toLowerCase().includes("dessert") ||
        meal.meal?.toLowerCase().includes("cake") ||
        meal.meal?.toLowerCase().includes("ice cream") ||
        meal.meal?.toLowerCase().includes("cookie") ||
        meal.instructions?.toLowerCase().includes("dessert")
      );
    }
    if (activeCategory === "Breakfast") {
      return (
        meal.category === "Breakfast" ||
        meal.meal?.toLowerCase().includes("breakfast") ||
        meal.meal?.toLowerCase().includes("pancake") ||
        meal.meal?.toLowerCase().includes("cereal") ||
        meal.meal?.toLowerCase().includes("toast") ||
        meal.meal?.toLowerCase().includes("egg") ||
        meal.instructions?.toLowerCase().includes("breakfast")
      );
    }
    if (activeCategory === "Dinner") {
      return (
        meal.category === "Dinner" ||
        meal.meal?.toLowerCase().includes("dinner") ||
        meal.meal?.toLowerCase().includes("burger") ||
        meal.meal?.toLowerCase().includes("pizza") ||
        meal.meal?.toLowerCase().includes("steak") ||
        meal.meal?.toLowerCase().includes("chicken") ||
        meal.instructions?.toLowerCase().includes("dinner")
      );
    }
    return true;
  });

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
                  disabled={true}
                >
                  {category}
                </Button>
              ))}
            </nav>
          </header>

          {loading && <div className={styles.loading}>Loading menu...</div>}
          {error && <div className={styles.error}>{error}</div>}

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
