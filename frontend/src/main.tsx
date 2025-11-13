import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
