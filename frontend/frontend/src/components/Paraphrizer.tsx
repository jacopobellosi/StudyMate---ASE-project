import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Textareas from "./Textareas";

function Paraphrizer() {
    const [userText, setUserText] = useState("");

    // Handle image upload and extract text
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);

          try {
            const response = await fetch("http://localhost:5003/extract-text", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            if (response.ok) {
              setUserText(data.extracted_text); // Update userText with extracted text
            } else {
              alert(data.error); // Handle error
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          }
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
      <Textareas text={userText} setText={setUserText}/>
        <div className="d-flex align-items-center gap-2">
            <input
                type="file"
                className="btn btn-outline-secondary"
                onChange={handleImageUpload}
            />
            <button type="button" className="btn btn-outline-secondary">
                Upload Audio
            </button>
            <button type="button" className="btn btn-success">
                Paraphraze
            </button>
        </div>

        <Footer/>
    </div>
    );
}

export default Paraphrizer;
