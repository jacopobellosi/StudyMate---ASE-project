import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
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

    const { email, password } = state;

    try {
      const response = await axios.post(`http://127.0.0.1:5000/users/login/?email=${email}&password=${password}`);
      setErrorMessage(""); // Clear error message
      navigate("/"); // Redirect to home page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = Array.isArray(error.response?.data?.detail)
          ? error.response.data.detail.map((err: any) => err.msg).join(", ")
          : error.response?.data?.detail || error.message;
        setErrorMessage(`Error login user: ${errorMessage}`);
      } else {
        setErrorMessage(`Error login user: ${(error as Error).message}`);
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
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span>Enter your credentials</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
