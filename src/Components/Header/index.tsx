import { useState, useEffect, SetStateAction } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleMenuOpen = (event: { currentTarget: SetStateAction<null>; }) => {
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

  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  // Fetch books based on search term
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bookopia/books/book-list?search=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          
          // setBooks(data);
          console.log("data",data)
        } else {
          console.error("Error fetching books:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

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
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="loginAndRegisterButtons">
        {token?.length ? (
          // <Avatar
          //   sx={{ bgcolor: deepOrange[500] }}
          //   style={{ cursor: "pointer" }}
          //   onClick={handleMenuOpen}
          // >
          //   {getLocalStorageItem("userName")?.charAt(0)}
          // </Avatar>
          <h1>avatar</h1>
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
