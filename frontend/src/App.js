import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "../src/components/user/login";
import Signup from "../src/components/user/signup";
import Dashboard from "../src/components/dashboard";
import { BudgetsProvider } from "./context/BudgetsContext";

function App() {
  return (
    <BrowserRouter>
      <BudgetsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BudgetsProvider>
    </BrowserRouter>
  );
}

export default App;
