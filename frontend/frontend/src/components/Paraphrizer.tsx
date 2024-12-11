import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";
import axios from "axios";
import { useState } from "react";

function Paraphrizer() {
  const [summary, setSummary] = useState(null);
  const handleSubmit = async () => {
    // Data to send to the API
    const requestData = {
      text: Text,
      percentage: 50,
    };

    try {
      // Make a POST request to the FastAPI endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/summarize/",
        requestData
      );
      setSummary(response.data); // Save the response
    } catch (error) {
      console.error("Error communicating with the API:", error);
    }
  };
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
      <Textareas value="" onChange={handleSubmit} />
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
