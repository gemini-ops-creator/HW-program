import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./LoginPage.module.css";
import {
  login,
  selectAuthError,
  selectAuthStatus,
} from "../../features/auth/authSlice.js";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const authStatus = useSelector(selectAuthStatus);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const submitting = authStatus === "loading";

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await dispatch(
        login({ email: credentials.email, password: credentials.password })
      ).unwrap();
      navigate("/order");
    } catch {
      // error handled via auth slice state
    }
  };

  const handleCancel = () => {
    setCredentials({ email: "", password: "" });
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Log in</h1>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.fieldRow}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={credentials.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.fieldRow}>
            <label
              htmlFor="password"
              className={`${styles.label} ${styles.passwordLabel}`}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.actions}>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>

          {authError && (
            <div className={styles.error}>
              {typeof authError === "string"
                ? authError
                : authError?.message || "Failed to log in. Please try again."}
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
