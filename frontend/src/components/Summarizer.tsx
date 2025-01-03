import Textareas from "./Textareas";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useState } from "react";

function Summarizer() {
  const [summary, setSummary] = useState(null);
  const handleSubmit = async () => {
    // Data to send to the API
    const requestData = {
      text: "text",
      percentage: 50.0,
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
      <Textareas value="" onChange={handleSubmit} />
      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-outline-secondary">
          Upload Image
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Upload Audio
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Summarise
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Summarizer;
