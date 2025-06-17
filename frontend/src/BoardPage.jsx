import React from "react";
import "./BoardPage.css";

const BoardPage = ({ board, onBack }) => {
  return (
    <div className="board-page">
      <div className="board-page-header">
        <button className="back-button" onClick={onBack}>
          &larr; Back
        </button>
        <h2 className="board-page-title">{board.title}</h2>
      </div>
      <div className="board-page-content">
        <div className="board-page-info">
          <img src={board.img} alt={board.title} className="board-page-image" />
          <div className="board-page-details">
            <p className="board-page-description">{board.description}</p>
            <p className="board-page-author">By: {board.author}</p>
          </div>
        </div>
        <div className="board-page-cards">
          <h3>Cards in this board</h3>
          <p>No cards yet. Cards will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
