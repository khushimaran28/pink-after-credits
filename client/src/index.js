import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./styles/theme.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />

        {/* Global Toasts */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--text-primary)",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();