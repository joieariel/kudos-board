import React, { useState } from "react";
import "./BoardPage.css";
import CardModal from "./CardModal";

const BoardPage = ({ board, onBack }) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Function to create a new card
  const createCard = (newCard) => {
    // For now, just log the card - you can integrate with your data management later
    console.log("New card created:", newCard);

    // You might want to add the card to your board's cards array here
    // This depends on how you're managing your board data
  };

  return (
    <div className="board-page">
      <div className="board-page-header">
        <button className="back-button" onClick={onBack}>
          {/* &;larr arrow icon */}
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
          <div className="cards-header">
            <h3>Cards in this board</h3>
            <button
              className="create-card-button"
              onClick={() => setIsCardModalOpen(true)}
            >
              + Create a Card
            </button>
          </div>

          {/* display existing cards or a message if none exist */}
          {board.cards && board.cards.length > 0 ? (
            <div className="card-list">
              {board.cards.map((card) => (
                <div key={card.id} className="card">
                  <p className="card-content">{card.content}</p>
                  <p className="card-author">- {card.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No cards yet.</p>
          )}
        </div>
      </div>

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onCreateCard={createCard}
      />
    </div>
  );
};

export default BoardPage;
