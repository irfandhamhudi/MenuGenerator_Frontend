import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MenuEditorPage from "./pages/MenuEditorPage";
import MenuPreviewPage from "./pages/MenuPreviewPage";
import PublicMenuPage from "./pages/PublicMenuPage";
import TrashPage from "./pages/TrashPage";
export default function App() {
  return (
    <BrowserRouter>
      {" "}
      <AuthProvider>
        {" "}
        <Routes>
          {" "}
          <Route path="/auth/login" element={<LoginPage />} />{" "}
          <Route path="/auth/register" element={<RegisterPage />} />{" "}
          <Route path="/public/menu/:id" element={<PublicMenuPage />} />{" "}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                {" "}
                <Navbar />{" "}
                <Routes>
                  {" "}
                  <Route path="/dashboard" element={<DashboardPage />} />{" "}
                  <Route path="/menu/new" element={<MenuEditorPage />} />{" "}
                  <Route path="/menu/:id/edit" element={<MenuEditorPage />} />{" "}
                  <Route path="/menu/:id/preview" element={<MenuPreviewPage />} />{" "}
                  <Route path="/trash" element={<TrashPage />} />{" "}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />{" "}
                </Routes>{" "}
              </ProtectedRoute>
            }
          />{" "}
        </Routes>{" "}
      </AuthProvider>{" "}
    </BrowserRouter>
  );
}
