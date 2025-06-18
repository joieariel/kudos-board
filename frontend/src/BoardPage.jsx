import React, { useState, useEffect, use } from "react";
import "./BoardPage.css";
import CardModal from "./CardModal";
import img from "/src/assets/img/hamilton.jpeg";

const BoardPage = ({ board, onBack }) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  // state to manage cards for this board
  //for static data
  //const [boardCards, setBoardCards] = useState(board.cards || []);

  const [boardCards, setBoardCards] = useState([]); // call empty array and fill it with datat from api call

  // fetch cards from backend
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/cards/${board.id}/cards`
        );
        const data = await response.json();
        setBoardCards(data);
      } catch (e) {
        console.error("Error fetching cards", e);
      }
    };

    getCards();
  }, [board.id]);
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
                  {console.log("1. ", card)}
                  <h4 className="card-title">{card.gifTitle}</h4>
                  {card.gifUrl && (
                    <div className="card-gif">
                      <img
                        src={card.gifUrl}
                        alt={card.gifTitle}
                        className="card-gif-image"
                      />
                    </div>
                  )}
                  <p className="card-content">{card.content}</p>
                  <p className="card-author">- {card.author}</p>
                  <div className="card-btns">
                    <button className="upvote-btn">Upvote:</button>
                    <button className="delete-card-btn">🗑️</button>
                  </div>
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
