import { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import Skeleton from "@mui/material/Skeleton";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import NoBooksBanner from "../../assets/no-book-banner.webp";
import "./style.css";
import AddBookModal from "../../Components/AddBookModal";

export interface IBooksList {
  id: number;
  title: string;
  author: string;
  condition: string;
  genre: string;
  availability: boolean;
  operationType: string;
  provider: Provider;
}

export interface Provider {
  name: string | null;
  email: string | null;
}

const BookListing = () => {
  const [books, setBooks] = useState<IBooksList[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await customAxios.get<IBooksList[]>("books/book-list");
      setBooks([...response.data]);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "40px",
          }}
        >
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
        <>
          <hr />
          <button
            className="addABookButton"
            style={{ margin: "20px 20px 0" }}
            onClick={handleOpenModal}
          >
            Add a Book
          </button>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "40px",
            }}
          >
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
        </>
      )}
      <AddBookModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fetchData={fetchData}
      />
    </div>
  );
};

export default BookListing;
