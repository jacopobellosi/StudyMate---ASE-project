import { useNavigate } from "react-router-dom";

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
      <div className="container-fluid justify-content-center align-items-center text-center mb-3">
        <h4>
          Made with <i className="bi bi-suit-heart-fill"></i> in AAU
        </h4>
        <a
          href="#"
          className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover me-2"
          onClick={() => {
            navigate("/docu");
          }}
        >
          Project Documentation
        </a>
        <i className="bi bi-circle-fill"></i>
        <a
          href="#"
          className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover ms-2"
          onClick={() => {
            navigate("/about");
          }}
        >
          About Us
        </a>
      </div>
    </div>
  );
}

export default Homescreen;
