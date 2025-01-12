import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  let navigate = useNavigate();
  return (
    <div className="row">
      <div className="col">
        <h1>{title}</h1>
      </div>
      <div className="col text-end">
        <button
          type="button"
          className="btn btn-warning mt-2 me-2"
          onClick={() => {
            navigate("/authorization");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
