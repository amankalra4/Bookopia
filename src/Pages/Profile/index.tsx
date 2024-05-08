import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import customAxios from "../../utils/axios";
import { CircularProgress } from "@mui/material";
import { errorToastWrapper, setLocalStorageItem } from "../../utils";
import YourPreferences from "../../Components/YourPreferences";
import BooksOwned from "../../Components/BooksOwned";
import "./styles.css";
import PersonalInformation from "../../Components/PersonalInformation";
import { IProfileResponse, IUpdateUserData } from "./interface";
import { IBooksList } from "../BookListing.tsx/interface";

export type Genres = [
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller"
];

const Profile = () => {
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState<IProfileResponse>(
    {} as IProfileResponse
  );
  const [ownedBooks, setOwnedBooks] = useState<IBooksList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooksDataLoading, setIsBooksDataLoading] = useState(false);
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
      errorToastWrapper("Error while getting profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooksData = async () => {
    try {
      setIsBooksDataLoading(true);
      const response = await customAxios.get<IBooksList[]>("books/book-list");
      setOwnedBooks([...response.data]);
    } catch (error) {
      errorToastWrapper("Error while fetching books");
    } finally {
      setIsBooksDataLoading(false);
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
      errorToastWrapper("Error while updating profile");
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
          genre: selectedGenres,
          email: userData.email,
        }
      );
      if (updateResponse.status === 200) {
        getUserDetails();
      }
    } catch (error) {
      errorToastWrapper("Error while updating profile");
    } finally {
      setIsGenreUpdating(false);
    }
  };

  return (
    <div className="tabsContainer">
      {isLoading || isBooksDataLoading ? (
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
                yourGenres={userData.genre as unknown as Genres[]}
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
