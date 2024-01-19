
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/taskify" element={<Home/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;

