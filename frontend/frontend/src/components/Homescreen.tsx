import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Homescreen() {
  let navigate = useNavigate();
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <h1>CondenseAI</h1>
      <p>The ultimate study companion</p>
      <div className="d-flex flex-column align-items-start gap-2">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            navigate("/paraphrizer");
          }}
        >
          Paraphrize
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            navigate("/summarizer");
          }}
        >
          Summarize
        </button>
      </div>
      <div className="flex-grow-1"></div>
      <Footer />
    </div>
  );
}

export default Homescreen;
