import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SyncProvider } from "./components/SyncProvider";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { ReviewPage } from "./pages/ReviewPage";
import { ProgressPage } from "./pages/ProgressPage";
import { StudyPage } from "./pages/StudyPage";

function Root() {
  const { userId } = useAuth();

  if (!userId) {
    return <LoginPage />;
  }

  return (
    <SyncProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<DashboardPage />} />
            <Route path="quiz-home" element={<HomePage />} />
            <Route path="study" element={<StudyPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="progress" element={<ProgressPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SyncProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);
