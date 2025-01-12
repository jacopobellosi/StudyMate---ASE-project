import Homescreen from "./components/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paraphrizer from "./components/Paraphrizer";
import Summarizer from "./components/Summarizer";
import Docu from "./components/Docu";
import About from "./components/About";
import Quiz from "./components/quiz/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/paraphrizer" element={<Paraphrizer />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/docu" element={<Docu />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
