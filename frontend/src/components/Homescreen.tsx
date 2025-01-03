import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Homescreen() {
  let navigate = useNavigate();
  return (
    <div className="container-fluid vh-100 d-flex flex-column gap-2">
      <h1>CondenseAI</h1>
      <p>The ultimate study companion</p>
      <div className="d-flex flex-row align-items-start gap-2">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            navigate("/paraphrizer");
          }}
        >
          Paraphrase
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            navigate("/summarizer");
          }}
        >
          Summarise
        </button>
      </div>
      <br/>
      <div className="d-flex flex-column align-items-middle gap-2">
        <h5>Why Choose CondenseAI?</h5>

        <ul>
          <li>Advanced AI models ensure high-quality results.</li>
          <li>Multi-format support (text, audio, images).</li>
          <li>User-friendly interface tailored for efficiency.</li>
          <li>Secure and scalable infrastructure.</li>
        </ul>
      </div>
      <div className="flex-grow-1"></div>
      <Footer />
    </div>
  );
}

export default Homescreen;
