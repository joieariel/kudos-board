import React, { useState } from "react";
import "./CardModal.css";
import GifPicker from "./GifPicker";

const CardModal = ({ isOpen, onClose, onCreateCard }) => {
  // state for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedGif, setSelectedGif] = useState(null);
  const [showGifPicker, setShowGifPicker] = useState(false);

  // state for validation errors
  const [errors, setErrors] = useState({});

  // reset form when modal is closed
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthor("");
    setSelectedGif(null);
    setErrors({});
  };

  // handle modal close
  const handleClose = () => {
    resetForm(); // clear form when closing
    onClose(); // call onClose function passed from parent
  };

  // validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!selectedGif) {
      newErrors.gif = "GIF is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission

    if (validateForm()) {
      // create new card object
      const newCard = {
        id: Date.now(), // use timestamp as temporary ID
        title: title.trim(),
        content: description.trim(), // using content to match your existing card structure
        author: author.trim() || "Anonymous", // use provided author or default to "Anonymous"
        gif: selectedGif, // include the selected GIF data
        createdAt: new Date(),
      };

      // call the onCreateCard function with the new card
      onCreateCard(newCard);

      // close modal and reset form
      handleClose();
    }
  };

  if (!isOpen) return null; // don't render if modal isn't open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h2>Create New Card</h2>

          <form onSubmit={handleSubmit}>
            {/* title input */}
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "error" : ""}
                placeholder="Enter card title..."
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            {/* description input */}
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={errors.description ? "error" : ""}
                placeholder="Enter card description..."
                rows="4"
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            {/* gif selection */}
            <div className="form-group">
              <label>GIF *</label>
              {selectedGif ? (
                <div className="selected-gif">
                  <img
                    src={selectedGif.url}
                    alt={selectedGif.title}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                      borderRadius: "4px",
                    }}
                  />
                  <div className="gif-actions">
                    <button
                      type="button"
                      className="change-gif-btn"
                      onClick={() => setShowGifPicker(true)}
                    >
                      Change GIF
                    </button>
                    <button
                      type="button"
                      className="remove-gif-btn"
                      onClick={() => setSelectedGif(null)}
                    >
                      Remove GIF
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="select-gif-btn"
                  onClick={() => setShowGifPicker(true)}
                >
                  Select GIF
                </button>
              )}
              {errors.gif && (
                <span className="error-message">{errors.gif}</span>
              )}
            </div>

            {/* author input */}
            <div className="form-group">
              <label htmlFor="author">Author (optional)</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name (optional)..."
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={handleClose}>
            Cancel
          </button>
          <button className="create-card-btn" onClick={handleSubmit}>
            Create Card
          </button>
        </div>
      </div>

      {/* gif picker modal */}
      {showGifPicker && (
        <GifPicker
          onGifSelect={(gif) => {
            setSelectedGif(gif);
            setShowGifPicker(false);
          }}
          onClose={() => setShowGifPicker(false)}
        />
      )}
    </div>
  );
};

export default CardModal;
