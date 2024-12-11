import { useState } from "react";

interface TextareasProps {
  value: string;
  onChange: (value: string) => void;
}

const Textareas = ({ value, onChange }: TextareasProps) => {
  const [text, setText] = useState("");

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="d-flex mb-3 mt-2 vh-100">
      <div className="w-50 me-2 d-flex position-relative">
        <div data-mdb-input-init className="form-outline flex-grow-1">
          <textarea
            className="form-control h-100"
            id="input"
            placeholder="To rewrite text, enter or paste it here and press Paraphraze"
            style={{ resize: "none" }}
            value={text} // Bind the value to the state
            onChange={(e) => setText(e.target.value)} // Update state on change
          />

          <div
            className="position-absolute top-0 end-0 mt-2 me-2 bg-light p-1"
            style={{ cursor: "pointer", fontSize: "1em" }}
            onClick={handleClear} // Add click handler
          >
            <i className="bi bi-x-circle"></i>
          </div>
        </div>
      </div>

      <div className="w-50 ms-2 d-flex">
        <div data-mdb-input-init className="form-outline flex-grow-1">
          <textarea
            className="form-control h-100"
            id="output"
            readOnly
            style={{ resize: "none" }}
            value={value}
            onChange={(e) => onChange(e.target.value)} // Call the onChange function with the new value
          />
        </div>
      </div>
    </div>
  );
};

export default Textareas;
