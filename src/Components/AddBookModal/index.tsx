import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import customAxios from "../../utils/axios";
import { IBookData } from "../BookCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { errorToastWrapper } from "../../utils";

const AddBookModal = ({
  isOpen,
  onClose,
  fetchData,
  isBookUpdate,
  bookData = null,
}: {
  isOpen: boolean;
  onClose: () => void;
  fetchData?: () => Promise<void>;
  isBookUpdate?: boolean;
  bookData?: IBookData | null;
}) => {
  const [formData, setFormData] = useState(
    bookData || {
      title: "",
      author: "",
      condition: "",
      genre: [""],
      operationType: "",
      image: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { image, ...bookWithoutImage } = formData;
    const updatedBookData = Object.fromEntries(
      Object.entries(bookWithoutImage).map(([key, value]) => {
        return key === "genre" ? [key, [value]] : [key, value];
      })
    );
    if (isBookUpdate) {
      try {
        setIsLoading(true);
        await customAxios.put("books/update-book", updatedBookData);
        onClose();
        navigate(ROUTES.BOOKS_LISTING);
      } catch (error) {
        errorToastWrapper("Error while updating book");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await customAxios.post("books/add-book", updatedBookData);
        fetchData && fetchData();
        onClose();
      } catch (error) {
        errorToastWrapper("Error while adding book");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2>{isBookUpdate ? "Update" : "Add"} a Book</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="author"
            label="Author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="condition"
            select
            label="Condition"
            value={formData.condition}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="old">Old</MenuItem>
          </TextField>
          <TextField
            name="genre"
            label="Genre"
            value={formData.genre}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="operationType"
            select
            label="OperationType"
            value={formData.operationType}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value="lend">Lend</MenuItem>
            <MenuItem value="borrow">Borrow</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !(
                formData.title.length > 0 &&
                formData.author.length > 0 &&
                formData.condition.length > 0 &&
                formData.genre?.[0]?.length > 0 &&
                formData.operationType.length > 0
              )
            }
            style={{ justifyContent: "center" }}
          >
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : isBookUpdate ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
