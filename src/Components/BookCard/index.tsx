import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { getRandomImage } from "../../utils";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { ROUTES } from "../../utils/constants";
import { IBooksList } from "../../Pages/BookListing.tsx/interface";

type Image = {
  image: string;
};

export type IBookData = Omit<IBooksList, "provider"> & Image;

const BookCard = ({ book }: { book: IBooksList }) => {
  const [randomImage, setRandomImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  const getColorForOperationType = (operationType: string) => {
    return operationType === "borrow" ? "primary" : "secondary";
  };

  const availabilityStyle = book.availability
    ? { color: "green" }
    : { color: "red" };

  const handleCardClick = () => {
    const bookData: IBookData = {
      author: book.author,
      availability: book.availability,
      condition: book.condition,
      genre: book.genre,
      operationType: book.operationType,
      title: book.title,
      image: randomImage,
      id: book.id,
    };
    const queryParams = queryString.stringify(bookData);
    navigate(`${ROUTES.BOOK_DETAILS}?${queryParams}`);
  };

  return (
    <Card
      className="bookCard"
      style={{ borderRadius: "10px", cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={randomImage}
        alt="Book Cover"
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{
            display: "flex",
            justifyContent: "space-between",
            textTransform: "capitalize",
            marginBottom: "16px",
            alignItems: "flex-end",
            alignContent: "flex-end",
          }}
        >
          {book.title}
          <Typography
            variant="h6"
            component="div"
            className="textTransform"
            style={{ marginTop: "8px" }}
          >
            <Chip
              label={book.operationType}
              size="small"
              variant="outlined"
              color={getColorForOperationType(book.operationType)}
              style={{ marginLeft: "8px" }}
            />
          </Typography>
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          <b>Author:</b> {book.author}
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          <b>Genre:</b> {book.genre}
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          {book.condition} Book
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="textTransform"
          style={availabilityStyle}
        >
          {book.availability ? "Available" : "Not Available"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
