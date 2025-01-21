import { useState, useRef } from "react";

function Sidebar() {
  const [items, setItems] = useState<string[]>([]); // State to store notes
  const [, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const createNewNote = () => {
    if (inputRef.current) {
      const newNote = inputRef.current.value.trim(); // Get the input value

      if (newNote === "") {
        alert("Note cannot be empty!");
        return;
      }

      if (items.includes(newNote)) {
        alert("This note already exists!");
        return;
      }

      setItems((prevItems) => [...prevItems, newNote]); // Add the new note to the list
      inputRef.current.value = ""; // Clear the input field
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <h2 className="me-3">My notes</h2>
        <i
          className="bi bi-plus fs-1"
          data-bs-toggle="modal"
          data-bs-target="#addNote"
          style={{ cursor: "pointer" }}
        ></i>

        <div
          className="modal fade"
          id="addNote"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create new note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="enterNameOfNote"
                    placeholder="Enter name of a new note"
                    ref={inputRef}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={createNewNote}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="d-flex" role="search">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-icon"
          />
          <span className="input-group-text" id="search-icon">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </form>

      <ul className="list-group">
        {items.map((item, index) => (
          <a
            href="#"
            className="list-group-item list-group-item-action list-group-item-light"
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              handleSelectItem(item);
            }}
          >
            {item}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
