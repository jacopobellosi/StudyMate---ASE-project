import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { name, email, password } = state;

    try {
      const response = await axios.post(`http://127.0.0.1:5000/users/?username=${name}&email=${email}&password=${password}`);
      setErrorMessage(""); // Clear error message
      navigate("/"); // Redirect to home page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = Array.isArray(error.response?.data?.detail)
          ? error.response.data.detail.map((err: any) => err.msg).join(", ")
          : error.response?.data?.detail || error.message;
        setErrorMessage(`Error registering user: ${errorMessage}`);
      } else {
        setErrorMessage(`Error registering user: ${(error as Error).message}`);
      }
    }

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
