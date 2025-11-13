import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/LoadingScreen";
import { ProductProvider } from "./components/ProductContext";
import { UserRoutes } from "./routes/UserRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <Router>
      <ProductProvider>
        {!loaded && (
          <LoadingScreen
            duration={2000}
            onLoadingComplete={() => setLoaded(true)}
            bg="#ffffff"
            color="#050a30"
          />
        )}
        {/* <h1>{t("welcome")}</h1> */}

        <Routes>
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User + Admin routes */}
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>

        <Toaster position="top-center" />
      </ProductProvider>
    </Router>
  );
}
