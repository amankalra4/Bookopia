import { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import Skeleton from "@mui/material/Skeleton";
import NoBooksBanner from "../../assets/no-book-banner.webp";
import "./style.css";
import AddBookModal from "../../Components/AddBookModal";
import { errorToastWrapper, getLocalStorageItem } from "../../utils";
import BookCard from "../../Components/BookCard";

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
  const token = getLocalStorageItem("token");

  const fetchData = async () => {
    try {
      const response = await customAxios.get<IBooksList[]>("books/book-list");
      setBooks([...response.data]);
    } catch (error) {
      errorToastWrapper("Error while fetching book");
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
          {token ? (
            <div className="noBooksContent">
              <img
                src={NoBooksBanner}
                alt="No Books Banner"
                style={{ borderRadius: "16px" }}
              />
              <div>
                <p>You do not have any books yet!!</p>
                <button className="addABookButton" onClick={handleOpenModal}>
                  Add a Book
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <button
            className="addABookButton"
            style={{
              margin: "20px 20px 0",
              position: "relative",
              left: "10px",
            }}
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
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
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
