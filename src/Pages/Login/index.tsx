import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ROUTES } from "../../utils/constants";
import customAxios from "../../utils/axios";
import { RegistrationResponse } from "../Registration";
import { errorToastWrapper, setLocalStorageItem } from "../../utils";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    try {
      setLoading(true);
      const response = await customAxios.post<RegistrationResponse>(
        "auth/login",
        {
          email,
          password,
        }
      );
      if (response?.data?.success) {
        setLocalStorageItem("token", response?.data?.token);
        setLocalStorageItem("userName", response?.data?.name!);
        navigate(ROUTES.HOME);
      } else {
        errorToastWrapper("Something Went Wrong, Please Try again");
      }
    } catch (error) {
      errorToastWrapper("Login Failed, Please Try again");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <div className="container">
      <h1>Welcome back to Bookopia</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="loginForm">
          <input
            type="email"
            placeholder="Enter your Email Id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="error">{emailError}</p>}
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </button>
        </div>
      </form>
      <div className="registerLink">
        <p>
          Don't have an account?
          <Link to={ROUTES.REGISTER}>
            <span> Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
