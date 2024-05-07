import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import "./styles.css";
import customAxios from "../../utils/axios";
import { Button, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { setLocalStorageItem } from "../../utils";
import { genres } from "./constants";
import { IBooksList } from "../BookListing.tsx";

export interface IProfileResponse {
  id: number;
  name: string;
  email: string;
  location: string;
  password: string;
  preferences: null;
  genre: string;
}

export interface IUpdateUserData {
  message: string;
  token: null;
  name: null;
  success: boolean;
}

export type Genres = [
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller"
];

const PersonalInformation = ({
  userData,
  handlePersonalInfoSubmit,
  isProfileUpdating,
}: {
  userData: IProfileResponse;
  handlePersonalInfoSubmit: (name: string, location: string) => Promise<void>;
  isProfileUpdating: boolean;
}) => {
  const [name, setName] = useState(userData.name);
  const [location, setLocation] = useState(userData.location);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = () => {
    handlePersonalInfoSubmit(name, location);
  };

  return (
    <div className="tabContent">
      <div className="personalInfoContainer">
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={handleChangeName}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          value={userData.email}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="location"
          label="Location"
          value={location}
          onChange={handleChangeLocation}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <Button
        style={{ position: "absolute", left: "40%", marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        {isProfileUpdating ? <CircularProgress color="inherit" /> : "Submit"}
      </Button>
    </div>
  );
};

const BooksOwned = ({ ownedBooks }: { ownedBooks: IBooksList[] }) => {
  return (
    <div className="tabContent">
      <div className="booksOwnedContainer">
        <h2>Books Owned</h2>
        <List>
          {ownedBooks.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem>
                <ListItemText
                  primary={`Title: ${book.title}`}
                  secondary={`Author: ${book.author}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

const YourPreferences = ({
  yourGenres,
  handleGenreSubmit,
  isGenreUpdating,
}: {
  yourGenres: Genres[];
  handleGenreSubmit: (genres: Genres[]) => Promise<void>;
  isGenreUpdating: boolean;
}) => {
  const [selectedGenres, setSelectedGenres] = useState<Genres[]>(yourGenres);

  const handleGenreChange = (event: any) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, name]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== name));
    }
  };

  const handleSubmit = () => {
    handleGenreSubmit(selectedGenres);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <h2>Your Genres</h2>
        {genres.map((genre) => (
          <FormControlLabel
            key={genre}
            control={
              <Checkbox
                checked={selectedGenres.includes(genre as unknown as Genres)}
                onChange={handleGenreChange}
                name={genre}
              />
            }
            label={genre}
          />
        ))}
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          {isGenreUpdating ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState<IProfileResponse>(
    {} as IProfileResponse
  );
  const [ownedBooks, setOwnedBooks] = useState<IBooksList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isGenreUpdating, setIsGenreUpdating] = useState(false);

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get<IProfileResponse>(
        "user/user-details"
      );
      if (response.status === 200) {
        setLocalStorageItem("userName", response?.data?.name!);
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error getting profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooksData = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get<IBooksList[]>("books/book-list");
      setOwnedBooks([...response.data]);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
    fetchBooksData();
  }, []);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handlePersonalInfoSubmit = async (name: string, location: string) => {
    try {
      setIsProfileUpdating(true);
      const updateResponse = await customAxios.put<IUpdateUserData>(
        "user/update-user",
        {
          name,
          location,
          email: userData.email,
        }
      );
      if (updateResponse.status === 200) {
        getUserDetails();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const handleGenreSubmit = async (selectedGenres: Genres[]) => {
    try {
      setIsGenreUpdating(true);
      const updateResponse = await customAxios.put<IUpdateUserData>(
        "user/update-user",
        {
          genre: selectedGenres[0],
          email: userData.email,
        }
      );
      if (updateResponse.status === 200) {
        getUserDetails();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsGenreUpdating(false);
    }
  };

  return (
    <div className="tabsContainer">
      {isLoading ? (
        <CircularProgress
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "40%",
          }}
        />
      ) : (
        <>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ height: "100%" }}
            style={{ top: "40px", position: "relative" }}
          >
            <Tab label="Personal Information" />
            <Tab label="Books Owned" />
            <Tab label="Your Genres" />
          </Tabs>
          <div className="tabContentContainer">
            {value === 0 && (
              <PersonalInformation
                userData={userData}
                handlePersonalInfoSubmit={handlePersonalInfoSubmit}
                isProfileUpdating={isProfileUpdating}
              />
            )}
            {value === 1 && <BooksOwned ownedBooks={ownedBooks} />}
            {value === 2 && (
              <YourPreferences
                yourGenres={["Fantasy", "Mystery"] as unknown as Genres[]}
                handleGenreSubmit={handleGenreSubmit}
                isGenreUpdating={isGenreUpdating}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
