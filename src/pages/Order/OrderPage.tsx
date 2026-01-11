import { useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import styles from "./OrderPage.module.css";
import {
  removeItem,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "../../features/cart/cartSlice";
import {
  selectOrderAddress,
  selectOrderError,
  selectOrderStatus,
  selectLastOrderId,
  setAddressField,
  submitOrder,
  resetOrderState,
} from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function OrderPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const address = useAppSelector(selectOrderAddress);
  const orderStatus = useAppSelector(selectOrderStatus);
  const orderError = useAppSelector(selectOrderError);
  const lastOrderId = useAppSelector(selectLastOrderId);
  const submitting = orderStatus === "loading";

  useEffect(() => {
    return () => {
      dispatch(resetOrderState());
    };
  }, [dispatch]);

  const handleQuantityInput = (id: string, value: string) => {
    const parsed = Number(value);
    if (!Number.isNaN(parsed) && parsed > 0) {
      dispatch(updateQuantity({ id, quantity: parsed }));
    }
  };

  const handleRemove = (id: string) => dispatch(removeItem(id));

  const handleAddressChange =
    (field: "street" | "house") => (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setAddressField({ field, value: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(submitOrder({ items, address })).unwrap();
    } catch {
      // error already in state
    }
  };

  const isCartEmpty = items.length === 0;
  const orderSuccess = orderStatus === "succeeded" && lastOrderId;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Finish your order</h1>
        </section>

        <section className={styles.orderSection}>
          {orderSuccess && (
            <div className={styles.success}>
              Order placed! ID: {lastOrderId}
            </div>
          )}
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
                {items.map(item => (
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
                        ${item.price.toFixed(2)}
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
                ))}
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
                    onChange={handleAddressChange("street")}
                    className={styles.input}
                    placeholder="Enter street"
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
                    onChange={handleAddressChange("house")}
                    className={styles.input}
                    placeholder="Enter house/apartment"
                    required
                  />
                </div>

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalValue}>${total.toFixed(2)}</span>
                </div>

                <Button type="submit" disabled={submitting}>
                  {submitting ? "Placing order..." : "Order"}
                </Button>

                {orderError && (
                  <div className={styles.error}>
                    {orderError || "Failed to place order"}
                  </div>
                )}
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
