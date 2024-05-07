import { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import Skeleton from "@mui/material/Skeleton";
import NoBooksBanner from "../../assets/no-book-banner.webp";
import "./style.css";
import AddBookModal from "../../Components/AddBookModal";
import { errorToastWrapper, getLocalStorageItem } from "../../utils";
import BookCard from "../../Components/BookCard";
import { Chip } from "@mui/material";
import { IBooksList } from "./interface";

const BookListing = () => {
  const [books, setBooks] = useState<IBooksList[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLentBooks, setShowLentBooks] = useState(false);
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(false);
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

  const handleToggleLentBooks = () => {
    setShowLentBooks((prev) => !prev);
  };

  const handleToggleBorrowedBooks = () => {
    setShowBorrowedBooks((prev) => !prev);
  };

  const renderBooks = () => {
    if (showBorrowedBooks && showLentBooks) {
      return books.map((book) => <BookCard key={book.id} book={book} />);
    } else if (showBorrowedBooks) {
      return books
        .filter((book) => book.operationType === "borrow")
        .map((book) => <BookCard key={book.id} book={book} />);
    } else if (showLentBooks) {
      return books
        .filter((book) => book.operationType === "lend")
        .map((book) => <BookCard key={book.id} book={book} />);
    } else {
      return books.map((book) => <BookCard key={book.id} book={book} />);
    }
  };

  return (
    <div className="bookListingContainer">
      {loading ? (
        <div className="skeletonContainer">
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              className={`addABookButton loggedInBookButton`}
              onClick={handleOpenModal}
            >
              Add a Book
            </button>
            <div className="loggedInBookButton">
              <Chip
                label="Books to be Lent"
                variant={showLentBooks ? "filled" : "outlined"}
                style={{ cursor: "pointer" }}
                onClick={handleToggleLentBooks}
                color={showLentBooks ? "primary" : "default"}
              />
              <Chip
                label="Books to be Borrowed"
                variant={showBorrowedBooks ? "filled" : "outlined"}
                style={{ marginLeft: "20px", cursor: "pointer" }}
                onClick={handleToggleBorrowedBooks}
                color={showBorrowedBooks ? "primary" : "default"}
              />
            </div>
          </div>
          <div className="bookCardContainer">{renderBooks()}</div>
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
