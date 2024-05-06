import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, SnackbarContent } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { ROUTES } from "../../utils/constants";
import customAxios from "../../utils/axios";
import { RegistrationResponse } from "../Registration";
import { setLocalStorageItem } from "../../utils";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState({
    isOpen: false,
    message: "",
  });
  const [errorData, setErrorData] = useState({ isOpen: false, message: "" });
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
        setSuccessData({ isOpen: true, message: response?.data?.message });
        navigate(ROUTES.HOME);
      } else {
        setErrorData({ isOpen: true, message: response?.data?.message });
      }
    } catch (error) {
      setErrorData({
        isOpen: true,
        message: "Login Failed, Please Try Again!",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSuccessClose = () => {
    setSuccessData({ ...successData, isOpen: false });
  };

  const handleErrorClose = () => {
    setErrorData({ ...errorData, isOpen: false });
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
      <Snackbar
        open={successData.isOpen}
        onClose={handleSuccessClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={successData.message}
          style={{ backgroundColor: "green" }}
        />
      </Snackbar>
      <Snackbar
        open={errorData.isOpen}
        onClose={handleErrorClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={errorData.message}
          style={{ backgroundColor: "#fa6464" }}
        />
      </Snackbar>
    </div>
  );
};

export default Login;
