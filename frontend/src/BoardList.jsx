import React, { useState } from "react";
import KudosBoard from "./KudosBoard";
import kudosData from "./data/data";
import "./BoardList.css";

const BoardList = ({ onViewBoard }) => {
  // state to store and manage the boards data
  const [boards, setBoards] = useState(kudosData);

  // function to delete a board by its id
  const deleteBoard = (id) => {
    // filter out the board with the matching id
    const updatedBoards = boards.filter((board) => board.id !== id);
    // update the state with the new array that doesn't include the deleted board
    setBoards(updatedBoards);
  };

  // function to handle viewing a board
  const handleViewBoard = (id) => {
    // find the board with the matching id
    const board = boards.find((board) => board.id === id);
    // call the onviewboard function passed from app with the selected board
    if (board) {
      onViewBoard(board);
    }
  };

  return (
    <div className="board-list-container">
      <h2 className="section-title">Kudos Board</h2>
      <div className="board-grid">
        {boards.map((board) => (
          <div key={board.id} className="board-grid-item">
            <KudosBoard
              id={board.id}
              title={board.title}
              img={board.img}
              description={board.description}
              author={board.author}
              onDelete={deleteBoard}
              onView={handleViewBoard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
