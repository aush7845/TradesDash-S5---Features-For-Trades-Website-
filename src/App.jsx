import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Features from "./pages/Features.jsx";
import ForTrades from "./pages/ForTrades.jsx";

// My screens only (G3-S5): Features and For Trades.
// Homepage ("/") and Pricing ("/pricing") belong to G3-S4 and are added when merged.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/features" element={<Features />} />
        <Route path="/for-trades" element={<ForTrades />} />
        <Route path="*" element={<Navigate to="/features" replace />} />
      </Route>
    </Routes>
  );
}