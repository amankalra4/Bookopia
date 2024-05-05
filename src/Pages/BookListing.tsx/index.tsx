import { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import Skeleton from "@mui/material/Skeleton";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import NoBooksBanner from "../../assets/no-book-banner.webp";
import "./style.css";
import AddBookModal from "../../Components/AddBookModal";

interface IBooksList {
  id: number;
  title: string;
  author: string;
  condition: string;
  genre: string;
  availability: boolean;
  operationType: string;
  provider: Provider;
}

interface Provider {
  name: string | null;
  email: string | null;
}

const BookListing = () => {
  const [books, setBooks] = useState<IBooksList[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get<IBooksList[]>("books/book-list");
        setBooks([...response.data, ...response.data, ...response.data]);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bookListingContainer">
      {loading ? (
        <div className="loadingIndicator">
          {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
            <div key={index} className="bookCard">
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="noBooksContainer">
          <div className="noBooksContent">
            <img
              src={NoBooksBanner}
              alt="No Books Banner"
              style={{ borderRadius: "16px" }}
            />
            <div>
              <p>No books available</p>
              <button className="addABookButton" onClick={handleOpenModal}>
                Add a Book
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 30 }}>
          {books.map((book) => (
            <Card key={book.id} className="bookCard">
              <CardMedia
                component="img"
                height="140"
                image={NoBooksBanner}
                alt="No book"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Title: {book.title}
                </Typography>
                <Typography variant="body1" component="div">
                  Author: {book.author}
                </Typography>
                <Typography variant="body1" component="div">
                  Genre: {book.genre}
                </Typography>
                <Typography variant="body1" component="div">
                  Availability:{" "}
                  {book.availability ? "Available" : "Not Available"}
                </Typography>
                <Typography variant="body1" component="div">
                  Operation Type: {book.operationType}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <AddBookModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BookListing;
