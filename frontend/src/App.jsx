import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WomensClubPage from "./pages/test";
import TestForm from "./pages/test-form";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<WomensClubPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<TestForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
