import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import customAxios from "../../utils/axios";

const AddBookModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
            label="Condition"
            value={formData.condition}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          />
          <TextField
            name="genre"
            label="Genre"
            value={formData.genre}
            onChange={handleChange}
            fullWidth
            required
            style={{ marginBottom: "20px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="operationType-label">Operation Type</InputLabel>
            <Select
              labelId="operationType-label"
              id="operationType"
              name="operationType"
              value={formData.operationType}
              onChange={handleChange}
              required
            >
              <MenuItem value="To lend">Lend</MenuItem>
              <MenuItem value="To borrow">Borrow</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
