
import Form from "./components/Form";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/taskify" element={<Form/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

