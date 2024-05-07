import { useState } from "react";
import { Genres } from "../../Pages/Profile";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { genres } from "../../Pages/Profile/constants";

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

export default YourPreferences;
