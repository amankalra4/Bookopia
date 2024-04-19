import { Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  return (
    <div className="container">
      <h1>Welcome back to Bookopia</h1>
      <div className="loginForm">
        <input type="email" placeholder="Enter you Email Id" />
        <input type="password" placeholder="Enter your Password" />
        <div className="forgoPassword">
          <Link to="/">
            <span>Forgot Password</span>
          </Link>
        </div>
        <button className="loginButton">Login</button>
        <p>OR</p>
        <button className="googleLoginButton">Login with Google</button>
        <div className="registerLink">
          <p>
            Don't have an account?
            <Link to="/register">
              <span>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
