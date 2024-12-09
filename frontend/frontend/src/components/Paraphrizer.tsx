import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";

function Paraphrizer() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <Header title="Paraphrazer" />
      <div className="d-flex align-items-center gap-2">
        <p>Style: </p>
        <button type="button" className="btn btn-outline-success">
          Standard
        </button>
        <button type="button" className="btn btn-outline-success">
          Formal
        </button>
        <button type="button" className="btn btn-outline-success">
          Fluency
        </button>
        <button type="button" className="btn btn-outline-success">
          Detailed
        </button>
        <button type="button" className="btn btn-outline-success">
          Academic
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
          Paraphraze
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Paraphrizer;
