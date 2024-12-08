import Footer from "./Footer";

function Paraphrizer() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <h1>Paraphrizer</h1>
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
      <div className="d-flex">
        <div className="w-50 me-2">
          <div data-mdb-input-init className="form-outline">
            <textarea
              className="form-control"
              id="input"
              placeholder="To rewrite text, enter or paste it here and press Paraphraze"
            />
          </div>
        </div>
        <div className="w-50 ms-2">
          <div data-mdb-input-init className="form-outline">
            <textarea className="form-control" id="output" readOnly />
          </div>
        </div>
      </div>
      <div className="flex-grow-1"></div>
      <Footer />
    </div>
  );
}

export default Paraphrizer;
