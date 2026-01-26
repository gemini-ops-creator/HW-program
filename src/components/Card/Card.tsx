import type { ChangeEvent } from "react";
import { useState } from "react";
import styles from "./Card.module.css";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";

type CardProps = {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number | string;
};

function Card({ id, name, description, image, price }: CardProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    dispatch(
      addToCart({
        item: { id, name, price: Number(price) || 0, image },
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
        {image ? (
          <img src={image} alt={name} className={styles.cardImage} />
        ) : (
          <div className={styles.placeholderImage}></div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <div className={styles.cardPrice}>${price}</div>
        </div>

        <p className={styles.cardDescription}>{description}</p>

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
