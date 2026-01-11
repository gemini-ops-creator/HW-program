import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import styles from "./LoginPage.module.css";
import {
  login,
  selectAuthError,
  selectAuthStatus,
} from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type Credentials = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const authStatus = useAppSelector(selectAuthStatus);
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const submitting = authStatus === "loading";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as keyof Credentials;
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
