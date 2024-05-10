import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { IProfileResponse } from "../../Pages/Profile/interface";

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
          autoComplete="off"
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
          autoComplete="off"
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

export default PersonalInformation;
