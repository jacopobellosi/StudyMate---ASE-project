import Homescreen from "./components/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paraphrizer from "./components/Paraphrizer";
import Summarizer from "./components/Summarizer";
import Docu from "./components/Docu";
import About from "./components/About";
import Authorization from "./components/Authorization";

import Register from "./components/AuthenticationPage";
import Login from "./components/AuthenticationPage";
import QuizInput from "./components/quiz/QuizInput";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/paraphrizer" element={<Paraphrizer />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/docu" element={<Docu />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizInput />} />
      </Routes>
    </Router>
  );
}

export default App;
