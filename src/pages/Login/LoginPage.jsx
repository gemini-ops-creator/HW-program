import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import styles from "./LoginPage.module.css";
import { login } from "../../store/authSlice.js";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(state => state.auth.error);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await dispatch(
        login({ email: credentials.email, password: credentials.password })
      ).unwrap();
      navigate("/order");
    } catch {
      // error already in state
    } finally {
      setSubmitting(false);
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
          <FormField
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            labelClassName={styles.label}
            inputClassName={styles.input}
            wrapperClassName={styles.fieldRow}
          />

          <FormField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            labelClassName={`${styles.label} ${styles.passwordLabel}`}
            inputClassName={styles.input}
            wrapperClassName={styles.fieldRow}
          />

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
              {authError || "Failed to log in. Please try again."}
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
