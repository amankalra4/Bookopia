import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import "./styles.css";

const PersonalInformation = () => {
  return (
    <div className="tabContent">
      <div className="personalInfoContainer">
        <TextField
          id="name"
          label="Name"
          defaultValue="John Doe"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="email"
          label="Email"
          defaultValue="john.doe@example.com"
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
          defaultValue="New York, USA"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
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
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className="tabsContainer">
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
        {value === 0 && <PersonalInformation />}
        {value === 1 && <BooksOwned ownedBooks={ownedBooks} />}
        {value === 2 && <YourPreferences preferences={preferences} />}
      </div>
    </div>
  );
};

export default Profile;
