import type { ChangeEvent } from "react";
import { useState } from "react";
import styles from "./Card.module.css";
import { addItem } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../store/hooks";
import type { Meal } from "../../services/ApiService";

function Card({ id, meal, instructions, img, price }: Meal) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    dispatch(
      addItem({
        id,
        name: meal,
        price: Number(price) || 0,
        image: img,
        quantity,
      })
    );
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {img ? (
          <img src={img} alt={meal} className={styles.cardImage} />
        ) : (
          <div className={styles.placeholderImage}></div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{meal}</h3>
          <div className={styles.cardPrice}>${price}</div>
        </div>

        <p className={styles.cardDescription}>{instructions}</p>

        <div className={styles.cardActions}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
          />
          <button onClick={handleAdd} className={styles.addButton}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
