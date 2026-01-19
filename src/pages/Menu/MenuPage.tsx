import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import styles from "./MenuPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  categories,
  increaseDisplayLimit,
  loadMeals,
  selectActiveCategory,
  selectDisplayLimit,
  selectMenuError,
  selectMenuItems,
  selectMenuStatus,
  setActiveCategory,
} from "../../features/menu/menuSlice";

function Menu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const meals = useAppSelector(selectMenuItems);
  const status = useAppSelector(selectMenuStatus);
  const error = useAppSelector(selectMenuError);
  const displayLimit = useAppSelector(selectDisplayLimit);
  const activeCategory = useAppSelector(selectActiveCategory);
  const loading = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadMeals());
    }
  }, [dispatch, status]);

  const loadMoreItems = () => {
    dispatch(increaseDisplayLimit(6));
  };

  const filteredMeals = meals.filter(meal => meal.category === activeCategory);

  const displayedMeals = filteredMeals.slice(0, displayLimit);
  const hasMoreItems = displayLimit < filteredMeals.length;

  return (
    <div className={styles.menuPageContainer}>
      <Header />
      <main className={styles.menuSection}>
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
                  onClick={() => dispatch(setActiveCategory(category))}
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
              <Card key={meal.id} {...meal} />
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
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Menu;
