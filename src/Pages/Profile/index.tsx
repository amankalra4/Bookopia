import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import "./styles.css";
import customAxios from "../../utils/axios";
import { Button, CircularProgress } from "@mui/material";
import { setLocalStorageItem } from "../../utils";

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

const PersonalInformation = ({
  userData,
  handlePersonalInfoSubmit,
  isProfileUpdating,
}: {
  userData: IProfileResponse;
  handlePersonalInfoSubmit: (
    name: string,
    email: string,
    location: string
  ) => Promise<void>;
  isProfileUpdating: boolean;
}) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [location, setLocation] = useState(userData.location);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = () => {
    handlePersonalInfoSubmit(name, email, location);
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
          value={email}
          onChange={handleChangeEmail}
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
        {isProfileUpdating ? <CircularProgress /> : "Submit"}
      </Button>
    </div>
  );
};

const BooksOwned = ({ ownedBooks }: any) => {
  return (
    <div className="tabContent">
      <div className="booksOwnedContainer">
        <h2>Books Owned</h2>
        <ul>
          {/* {[].map((book) => (
            <li key={book.id}>{book.title}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

const YourPreferences = ({ preferences }: any) => {
  return (
    <div className="tabContent">
      <div className="preferencesContainer">
        <h2>Your Preferences</h2>
        <ul>
          {[].map((preference, index) => (
            <li key={index}>{preference}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState<IProfileResponse>(
    {} as IProfileResponse
  );
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

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

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handlePersonalInfoSubmit = async (
    name: string,
    email: string,
    location: string
  ) => {
    try {
      setIsProfileUpdating(true);
      const updateResponse = await customAxios.put<IUpdateUserData>(
        "user/update-user",
        {
          name,
          email,
          location,
        }
      );
      if (updateResponse.status === 200) {
        getUserDetails();
      }
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsProfileUpdating(false);
    }
  };

  return (
    <div className="tabsContainer">
      {isLoading ? (
        <CircularProgress
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: "30%",
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
          >
            <Tab label="Personal Information" />
            <Tab label="Books Owned" />
            <Tab label="Your Preferences" />
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
            {value === 2 && <YourPreferences preferences={preferences} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
