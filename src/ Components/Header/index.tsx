import "./styles.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <header className="header">
      <div className="logo">
        <span>Bookopia</span>
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Search books..." />
      </div>
      <div className="loginAndRegisterButtons">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </header>
  );
};

export default Header;
