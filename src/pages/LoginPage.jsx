import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bot, Mail, Lock } from "lucide-react";

import { login } from "../features/auth/authService";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      dispatch(loginFailure("Email and password are required"));
      return;
    }

    try {
      dispatch(loginStart());

      const data = await login(email.trim(), password.trim());

      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user,
        })
      );

      const role = data.user.role?.toLowerCase();

      if (role === "manager") {
        navigate("/manager", { replace: true });
      } else {
        navigate("/assistant", { replace: true });
      }
    } catch (err) {
      dispatch(
        loginFailure(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Login failed"
        )
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoCircle}>
          <Bot size={34} color="white" />
        </div>

        <h1 style={styles.title}>Welcome to MaintAI</h1>

        <p style={styles.subtitle}>
          Your Knowledge Assistant
        </p>

        <div style={styles.inputBox}>
          <Mail size={20} color="#6B7280" />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputBox}>
          <Lock size={20} color="#6B7280" />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{
            ...styles.button,
            opacity: isLoading ? 0.7 : 1,
          }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footerText}>
          Smart industrial troubleshooting for teams
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F6F1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 430,
    background: "#FFFFFF",
    padding: "36px 34px",
    borderRadius: 28,
    border: "1px solid #E4DCC8",
    boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: "50%",
    background: "#F1C84B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },

  title: {
    margin: 0,
    color: "#111827",
    fontSize: 32,
    fontWeight: 900,
    lineHeight: 1.2,
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 28,
    color: "#7A7A7A",
    fontSize: 17,
    fontWeight: 500,
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#F8F6F1",
    border: "1px solid #E4DCC8",
    borderRadius: 16,
    padding: "0 14px",
    marginTop: 16,
  },

  input: {
    width: "100%",
    height: 54,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 16,
    color: "#111827",
  },

  button: {
    width: "100%",
    height: 56,
    marginTop: 24,
    border: "none",
    borderRadius: 16,
    background: "#F1C84B",
    color: "#111827",
    fontSize: 18,
    fontWeight: 900,
    cursor: "pointer",
  },

  error: {
    marginTop: 14,
    color: "#DC2626",
    fontSize: 14,
    fontWeight: 700,
  },

  footerText: {
    marginTop: 20,
    color: "#8D8D8D",
    fontSize: 14,
    fontWeight: 500,
  },
};