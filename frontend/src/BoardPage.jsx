import React, { useState } from "react";
import "./BoardPage.css";
import CardModal from "./CardModal";

const BoardPage = ({ board, onBack }) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  // state to manage cards for this board
  const [boardCards, setBoardCards] = useState(board.cards || []);

  // function to create a new card
  const createCard = (newCard) => {
    console.log("New card created:", newCard);

    // add the new card to the board's cards array
    setBoardCards((prevCards) => [...prevCards, newCard]);
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
          {boardCards && boardCards.length > 0 ? (
            <div className="card-list">
              {boardCards.map((card) => (
                <div key={card.id} className="card">
                  <h4 className="card-title">{card.title}</h4>
                  {card.gif && (
                    <div className="card-gif">
                      <img
                        src={card.gif.url}
                        alt={card.gif.title}
                        className="card-gif-image"
                      />
                    </div>
                  )}
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
