import Homescreen from "./components/Homescreen";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Docu from "./components/Docu";
import About from "./components/About";
import Register from "./components/AuthenticationPage";
import Login from "./components/AuthenticationPage";
import QuizInteractor from "./components/quiz/QuizInteractor"; // Import the QuizInteractor component

function QuizWrapper() {
  const location = useLocation();
  const quizData = location.state?.quizData;
  return <QuizInteractor quizData={quizData} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/docu" element={<Docu />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
