import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";
import {
  MenuItem,
  Menu,
  Modal,
  Button,
  Box,
  FormControlLabel,
  Radio,
  Badge,
  ButtonBase,
} from "@mui/material";
import {
  clearLocalStorage,
  errorToastWrapper,
  getLocalStorageItem,
  getRandomImage,
} from "../../utils";
import { ROUTES } from "../../utils/constants";
import Logo from "../../assets/logo.png";
import "./styles.css";
import customAxios from "../../utils/axios";
import { IBookData } from "../BookCard";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import queryString from "query-string";
import { SearchResponse } from "./interface";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    "genre" | "author" | "title"
  >("title");
  const navigate = useNavigate();
  const token = getLocalStorageItem("token");
  const [isItemClicked, setIsItemClicked] = useState(false);

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      setIsItemClicked(false);
      setLoading(true);
      const response = await customAxios.get<SearchResponse[]>(
        `books/search-book?${selectedFilter}=${searchTerm}`
      );
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        errorToastWrapper("Something went wrong!");
      }
    } catch (error) {
      errorToastWrapper("Error while fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [searchTerm]);

  const handleSearchResultClick = (book: any) => {
    const bookData: IBookData = {
      author: book.author,
      availability: book.availability,
      condition: book.condition,
      genre: book.genre,
      operationType: book.operationType,
      title: book.title,
      image: getRandomImage(),
      id: book.id,
    };
    setIsItemClicked(true);
    const queryParams = queryString.stringify(bookData);
    navigate(`${ROUTES.BOOK_DETAILS}?${queryParams}`);
  };

  const handleFilterIconClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = () => {
    handleModalClose();
  };

  const handleGenreFilterChange = () => {
    setSelectedFilter("genre");
  };

  const handleAuthorFilterChange = () => {
    setSelectedFilter("author");
  };

  const handleTitleFilterChange = () => {
    setSelectedFilter("title");
  };

  const handleBookListClick = (bookId: number) => {
    const selectedOption = searchResults.find((result) => result.id === bookId);
    if (selectedOption) {
      handleSearchResultClick(selectedOption);
    }
  };

  return (
    <header className="header">
      <ButtonBase className="logo" onClick={navigateToHome}>
        <img
          src={Logo}
          alt="Bookopia Logo"
          style={{ maxWidth: "100%", maxHeight: "40px" }}
        />
        <span>Bookopia</span>
      </ButtonBase>

      <div className="searchBar">
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Search Books"
              style={{ backgroundColor: "white", borderRadius: "10px" }}
              onChange={handleSearchChange}
            />
          )}
          freeSolo
          disableClearable
          options={searchResults.length ? searchResults : []}
          getOptionLabel={(option: any) => {
            if (selectedFilter === "genre") {
              return option?.[selectedFilter]?.[0];
            }
            return option[selectedFilter];
          }}
          loading={loading}
          onInputChange={(event, value) => setSearchTerm(value)}
          style={{ width: "70%", border: "none", borderRadius: "10px" }}
          isOptionEqualToValue={(option, value) =>
            option[selectedFilter] === value[selectedFilter]
          }
          renderOption={(props, option: SearchResponse) => (
            <ButtonBase
              style={{
                padding: "8px 16px",
                width: "100%",
                justifyContent: "flex-start",
              }}
              key={option.id}
              onClick={() => handleBookListClick(option.id)}
            >
              <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                Book {selectedFilter}: {option[selectedFilter]}
              </span>
            </ButtonBase>
          )}
          open={!isItemClicked}
        />
        <div style={{ position: "relative", display: "inline-block" }}>
          <TuneIcon
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleFilterIconClick}
          />
          <Badge
            badgeContent={1}
            color="primary"
            style={{
              position: "absolute",
              top: -4,
              right: -4,
            }}
          />
        </div>
      </div>

      <div className="loginAndRegisterButtons">
        {token?.length ? (
          <div>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              style={{ cursor: "pointer" }}
              onClick={handleMenuOpen}
            >
              {getLocalStorageItem("userName")?.charAt(0)}
            </Avatar>
          </div>
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

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            minWidth: "400px",
            width: "80%",
            maxWidth: "600px",
            outline: "none",
          }}
        >
          <h2 id="modal-title">Filters</h2>
          <div>
            <FormControlLabel
              control={<Radio />}
              label="Title"
              onChange={handleTitleFilterChange}
              checked={selectedFilter === "title"}
            />
            <FormControlLabel
              control={<Radio />}
              label="Genre"
              onChange={handleGenreFilterChange}
              checked={selectedFilter === "genre"}
            />
            <FormControlLabel
              control={<Radio />}
              label="Author"
              onChange={handleAuthorFilterChange}
              checked={selectedFilter === "author"}
            />
          </div>
          <div style={{ marginTop: "20px", gap: "30px", display: "flex" }}>
            <Button onClick={handleApplyFilters} variant="outlined">
              Apply Filters
            </Button>
            <Button onClick={handleModalClose} variant="outlined">
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </header>
  );
};

export default Header;
