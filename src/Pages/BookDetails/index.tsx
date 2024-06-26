import { useEffect, useState } from "react";
import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import AddBookModal from "../../Components/AddBookModal";
import "./styles.css";
import { IBookData } from "../../Components/BookCard";
import { ROUTES } from "../../utils/constants";
import customAxios from "../../utils/axios";
import { errorToastWrapper, getLocalStorageItem } from "../../utils";

interface IDeleteResponse {
  message: string;
  success: true;
}
const BookDetails = () => {
  const [openBookModal, setOpenBookModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [book, setBook] = useState<IBookData>({} as IBookData);
  const [isDeleting, setIsDeleting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = getLocalStorageItem("token");

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    setBook(queryParams as any);
  }, [location.search]);

  const handleUpdate = () => {
    setOpenBookModal(true);
  };

  const handleCloseModal = () => {
    setOpenBookModal(false);
  };

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleCancelDelete = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await customAxios.delete<IDeleteResponse>(
        `books/delete-book?id=${book.id}`
      );
    } catch (error) {
      errorToastWrapper("Error while deleting book");
    } finally {
      setIsDeleting(false);
    }
    navigate(ROUTES.BOOKS_LISTING);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        alignItems: "flex-start",
        gap: "40px",
        position: "absolute",
        left: "30%",
        top: "20%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <img
          src={book.image}
          alt="Book Cover"
          height={200}
          width={300}
          style={{ border: "1px solid black", borderRadius: "5px" }}
        />
        <Typography variant="h4" style={{ textTransform: "capitalize" }}>
          {book.title}
        </Typography>
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
          <b>Author:</b> {book.author}
        </Typography>
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
          <b>Condition:</b> {book.condition}
        </Typography>
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
          <b>Genre:</b> {book.genre}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "relative",
          top: "50px",
        }}
      >
        {token && (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </div>
      {openBookModal && (
        <AddBookModal
          isOpen={openBookModal}
          onClose={handleCloseModal}
          isBookUpdate
          bookData={book}
        />
      )}
      <Modal
        open={openModal}
        onClose={handleCancelDelete}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="deleteModal">
          <Typography variant="h5">Confirmation</Typography>
          <Typography variant="body1">
            Are you sure you want to proceed with deletion?
          </Typography>
          <div className="modalActions">
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              {isDeleting ? <CircularProgress color="inherit" /> : "Yes"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelDelete}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetails;
