import React, { useState, useEffect } from "react";
import "./BoardPage.css";
import CardModal from "./CardModal";

const BoardPage = ({ board, onBack }) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  // state to manage cards for this board
  //for static data
  //const [boardCards, setBoardCards] = useState(board.cards || []);

  const [boardCards, setBoardCards] = useState([]); // call empty array and fill it with datat from api call

  // Get backend API URL from environment variable
  const BACKEND_API = import.meta.env.VITE_BACKEND_URL;

  // fetch cards from backend
  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch(`${BACKEND_API}/cards/${board.id}/cards`);
        const data = await response.json();
        setBoardCards(data);
      } catch (e) {
        console.error("Error fetching cards", e);
      }
    };

    getCards();
  }, [board.id]);
  // function to create a new card
  const createCard = async (newCard) => {
    console.log("New card created:", newCard);

    try {
      // prepare the card data for the backend API
      const cardData = {
        title: newCard.title,
        content: newCard.content,
        author: newCard.author,
        gifUrl: newCard.gif?.url || "", // extract URL from gif object
        boardId: board.id, // include the board ID
      };
      // make POST request to create card in database
      const response = await fetch(`${BACKEND_API}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedCard = await response.json();
      console.log("Card saved to database:", savedCard);

      // add the saved card to the board's cards array
      setBoardCards((prevCards) => [...prevCards, savedCard]);
    } catch (error) {
      console.error("Error creating card:", error);

      alert("Failed to create card. Please try again.");
    }
  };

  // function to handle upvoting a card
  const handleUpvote = async (cardId) => {
    try {
      const response = await fetch(`${BACKEND_API}/cards/${cardId}/upvote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCard = await response.json();
      console.log("Card upvoted:", updatedCard);

      // update the card in the local state
      setBoardCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? { ...card, voteCount: updatedCard.voteCount }
            : card
        )
      );
    } catch (error) {
      console.error("Error upvoting card:", error);
      alert("Failed to upvote card. Please try again.");
    }
  };

  // function to handle deleting a card
  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`${BACKEND_API}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Card deleted:", cardId);

      // remove the card from the local state
      setBoardCards((prevCards) =>
        prevCards.filter((card) => card.id !== cardId)
      );
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete card. Please try again.");
    }
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
          <img src="/joie.jpg" alt={board.title} className="board-page-image" />
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
                  <h4 className="card-title">{card.title}</h4>
                  {card.gifUrl && (
                    <div className="card-gif">
                      <img
                        src={card.gifUrl}
                        alt={card.title}
                        className="card-gif-image"
                      />
                    </div>
                  )}
                  <p className="card-content">{card.content}</p>
                  <p className="card-author">- {card.author}</p>
                  <div className="card-btns">
                    <button
                      className="upvote-btn"
                      onClick={() => handleUpvote(card.id)}
                    >
                      Upvote: {card.voteCount || 0}
                    </button>
                    <button
                      className="delete-card-btn"
                      onClick={() => handleDelete(card.id)}
                    >
                      Delete Card
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-cards-message">No cards yet.</p>
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
