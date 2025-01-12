import { useState } from "react";

function Sidebar() {
  let items = ["Homework 1", "Homework 2", "Lection 1"];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <div className="d-flex align-items-center">
        <h2 className="me-3">My notes</h2>
        <i className="bi bi-plus fs-1"></i>
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
          <li
            className={
              selectedIndex === index
                ? "list-group-item list-group-item-dark"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              handleSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
