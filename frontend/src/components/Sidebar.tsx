import { useState, useRef, useEffect } from "react";

interface SidebarProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Sidebar({ setText, setCurrentNoteId }: SidebarProps) {
  const [items, setItems] = useState<any[]>([]); // change from any to some class
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectItem = (item: any, index: number) => {
    setText(item.note_content);
    setCurrentNoteId(item.id);
    setSelectedIndex(index);
  };

  const createNote = async () => {
    const titleElement = document.getElementById('enterNameOfNote') as HTMLInputElement;

    const title = titleElement?.value ?? '';
    console.log('Title:', title);

    if (title) {
      const token = localStorage.getItem('token');
      const payload = {
        notes_title: title,
        note_content: ""
      };
      try {
        const response = await fetch('http://localhost:5000/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          console.log('Note saved successfully');
          fetchNotes(); // Refresh the notes list after saving a new note
        } else {
          console.error('Failed to save note', response.statusText);
        }
      } catch (error) {
        console.error('Error saving note', error);
      }
    } else {
      console.error('Title is missing');
    }
  };

  const createNewNote = () => {
    createNote();
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const notes = await response.json();
        console.log('Fetched notes:', notes);
        setItems(notes); // Store the entire note objects
      } else {
        console.error('Failed to fetch notes', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
            className={`list-group-item list-group-item-action list-group-item-light ${selectedIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              handleSelectItem(item, index);
            }}
          >
            {item.notes_title}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
