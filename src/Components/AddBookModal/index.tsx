import { useState } from "react";
import { Modal, TextField, Button, MenuItem } from "@mui/material";
import customAxios from "../../utils/axios";

const AddBookModal = ({
  isOpen,
  onClose,
  fetchData,
}: {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    condition: "",
    genre: "",
    operationType: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await customAxios.post("books/add-book", formData);
      fetchData();
      onClose();
    } catch (error) {
      console.error("Error adding book:", error);
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
        <h2>Add a Book</h2>
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
                formData.genre.length > 0 &&
                formData.operationType.length > 0
              )
            }
            style={{ justifyContent: "center" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
