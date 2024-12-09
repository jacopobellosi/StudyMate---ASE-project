import Textareas from "./Textareas";
import Footer from "./Footer";
import Header from "./Header";

function Summarizer() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title="Summarizer" />
      <div className="d-flex align-items-center gap-2">
        <p>Style: </p>
        <button type="button" className="btn btn-outline-success">
          Detailed
        </button>
        <button type="button" className="btn btn-outline-success">
          Short
        </button>
      </div>
      <Textareas />
      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-outline-secondary">
          Upload Image
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Upload Audio
        </button>
        <button type="button" className="btn btn-success">
          Summarize
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Summarizer;
