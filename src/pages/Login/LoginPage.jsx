import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./LoginPage.module.css";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
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
      await login(credentials.email, credentials.password);
      navigate("/order");
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
              {authError.message || "Failed to log in. Please try again."}
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
