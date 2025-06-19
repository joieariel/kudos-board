import React, { useState } from "react";
import "./CreateBoardModal.css";

const CreateBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Reset form when modal is closed
  const resetForm = () => {
    setTitle("");
    setCategory("");
    setAuthor("");
    setErrors({});
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create new board object
      const newBoard = {
        id: Date.now(), // Use timestamp as temporary ID
        title,
        description: category, // Category is stored as description in the data structure
        author: author.trim() || "Anonymous", // Default to "Anonymous" if author is empty
        img: "/src/assets/img/joie.jpg", // Use default image
        createdAt: new Date()
      };

      // Call the onCreateBoard function with the new board
      onCreateBoard(newBoard);

      // Close modal and reset form
      handleClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Board</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "error" : ""}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={errors.category ? "error" : ""}
            >
              <option value="">Select a category</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank you">Thank you</option>
              <option value="Inspiration">Inspiration</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author (optional)</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>Cancel</button>
            <button type="submit" className="submit-button">Create Board</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
