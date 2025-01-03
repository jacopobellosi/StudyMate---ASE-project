import { useNavigate } from "react-router-dom";

const Footer = () => {
  let navigate = useNavigate();
  return (
    <div className="container-fluid justify-content-center align-items-center text-center mb-3">
      <h5>
        Made with 💜 in AAU
      </h5>
      <a
        href="#"
        className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover me-2"
        onClick={() => {
          navigate("/docu");
        }}
      >
        Project Documentation
      </a>
      <i className="bi bi-circle-fill"></i>
      <a
        href="#"
        className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover ms-2"
        onClick={() => {
          navigate("/about");
        }}
      >
        About Us
      </a>
    </div>
  );
};

export default Footer;
