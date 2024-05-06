import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { clearLocalStorage, getLocalStorageItem } from "../../utils";
import { ROUTES } from "../../utils/constants";
import Logo from "../../assets/logo.png";
import "./styles.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = getLocalStorageItem("token");

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  const navigateToHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    navigate(ROUTES.PROFILE);
    handleMenuClose();
  };

  const handleLogout = () => {
    navigate(ROUTES.HOME);
    clearLocalStorage();
    handleMenuClose();
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo" onClick={navigateToHome}>
        <img
          src={Logo}
          alt="Bookopia Logo"
          style={{ maxWidth: "100%", maxHeight: "40px" }}
        />
        <span>Bookopia</span>
      </div>

      <div className="searchBar">
        <input
          className="inputText"
          type="text"
          placeholder="Search books..."
        />
      </div>
      <div className="loginAndRegisterButtons">
        {token?.length ? (
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            style={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
          >
            {getLocalStorageItem("userName")?.charAt(0)}
          </Avatar>
        ) : (
          <>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
