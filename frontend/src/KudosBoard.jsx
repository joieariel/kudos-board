import React from "react";
import "./KudosBoard.css";

const KudosBoard = ({ id, title, img, description, author, onDelete, onView }) => {
  // function to handle the delete button click
  const handleDelete = () => {
    // call the onDelete function passed from parent with this board's id
    onDelete(id);
  };

  // function to handle the view button click
  const handleView = () => {
    // call the onView function passed from parent with this board's id
    onView(id);
  };

  return (
    <div className="kudos-board">
      {/* display the board img, title, description, and author */}
      <img src={img} alt={title} className="kudos-image" />
      <div className="kudos-content">
        <h3>{title}</h3>
        <p className="kudos-description">{description}</p>
        <p className="kudos-author">By: {author}</p>
        <div className="kudos-buttons">
          {/* view button with onClick handler that calls handleView */}
          <button className="view-button" onClick={handleView}>
            View Board
          </button>
          {/* delete button with onClick handler that calls handleDelete */}
          <button className="delete-button" onClick={handleDelete}>
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default KudosBoard;
