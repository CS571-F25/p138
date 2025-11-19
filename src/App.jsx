import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarTop from "./components/NavbarTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Build from "./pages/Build";

export default function App() {
  return (
    <Router basename="/p138">
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/build" element={<Build />} />
      </Routes>
    </Router>
  );
}
