import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import styles from "./OrderPage.module.css";
import { clearCart, removeItem, updateQuantity } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function OrderPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(state => state.cart.items);
  const [address, setAddress] = useState({ street: "", house: "" });
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  const resetFeedback = () => {
    if (error) {
      setError(null);
    }
  };

  const handleQuantityInput = (id: string, value: string) => {
    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed > 0) {
      resetFeedback();
      dispatch(updateQuantity({ id, quantity: parsed }));
    }
  };

  const handleRemove = (id: string) => {
    resetFeedback();
    dispatch(removeItem(id));
  };

  const handleAddressChange = (
    field: "street" | "house",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    resetFeedback();
    setAddress(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty. Add items before ordering.");
      return;
    }
    setError(null);
    dispatch(clearCart());
  };

  const isCartEmpty = items.length === 0;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Finish your order</h1>
        </section>

        <section className={styles.orderSection}>
          {isCartEmpty ? (
            <div className={styles.emptyState}>
              <p>Your cart is empty. Add something tasty to get started.</p>
              <div className={styles.emptyActions}>
                <Button onClick={() => navigate("/menu")}>Go to Menu</Button>
                <Button variant="secondary" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.itemsList}>
                {items.map(item => {
                  const price = Number(item.price) || 0;
                  return (
                    <article key={item.id} className={styles.itemCard}>
                      <div className={styles.itemLeft}>
                        <div className={styles.itemImageWrapper}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className={styles.itemImage}
                            />
                          ) : (
                            <div className={styles.itemPlaceholder} />
                          )}
                        </div>
                        <div>
                          <h3 className={styles.itemName}>{item.name}</h3>
                        </div>
                      </div>

                      <div className={styles.itemRight}>
                        <div className={styles.itemPrice}>
                          ${price.toFixed(2)}
                        </div>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e =>
                            handleQuantityInput(item.id, e.target.value)
                          }
                          className={styles.qtyInput}
                          aria-label={`Quantity for ${item.name}`}
                        />
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => handleRemove(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <form className={styles.summaryCard} onSubmit={handleSubmit}>
                <div className={styles.summaryRow}>
                  <label className={styles.label} htmlFor="street">
                    Street
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={address.street}
                    onChange={event => handleAddressChange("street", event)}
                    className={styles.input}
                    placeholder="Enter street"
                    minLength={2}
                    required
                  />
                </div>
                <div className={styles.summaryRow}>
                  <label className={styles.label} htmlFor="house">
                    House
                  </label>
                  <input
                    id="house"
                    name="house"
                    type="text"
                    value={address.house}
                    onChange={event => handleAddressChange("house", event)}
                    className={styles.input}
                    placeholder="Enter house/apartment"
                    minLength={1}
                    required
                  />
                </div>

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue}>${total.toFixed(2)}</span>
                </div>

                <Button type="submit">Order</Button>

                {error && <div className={styles.error}>{error}</div>}
              </form>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default OrderPage;
