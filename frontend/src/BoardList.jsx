import React, { useState, useEffect } from "react";
import KudosBoard from "./KudosBoard";
import kudosData from "./data/data";
import "./BoardList.css";

const BoardList = ({ onViewBoard, searchQuery, selectedCategory }) => {
  // state to store and manage the boards data
  const [boards, setBoards] = useState(kudosData);
  // state to store filtered boards
  const [filteredBoards, setFilteredBoards] = useState(kudosData);

  // filter boards when search query or category changes
  useEffect(() => {
    // first, apply category filter
    let categoryFiltered = [...boards];

    if (selectedCategory === "recent") {
      // sort by createdAt date (newest first) and take the 6 most recent
      categoryFiltered = [...boards].sort((a, b) =>
        b.createdAt - a.createdAt
      ).slice(0, 6);
    } else if (selectedCategory !== "all") {
      // filter by category (which matches the description field)
      categoryFiltered = boards.filter(board =>
        board.description === selectedCategory
      );
    }

    // then apply search filter if there's a search query
    if (!searchQuery) {
      setFilteredBoards(categoryFiltered);
      return;
    }

    // filter boards based on search query
    const searchFiltered = categoryFiltered.filter(board => {
      // search in title, description, and author
      const searchLower = searchQuery.toLowerCase();
      return (
        board.title.toLowerCase().includes(searchLower) ||
        board.description.toLowerCase().includes(searchLower) ||
        board.author.toLowerCase().includes(searchLower)
      );
    });

    setFilteredBoards(searchFiltered);
  }, [searchQuery, selectedCategory, boards]);

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
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
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
          ))
        ) : (
          <div className="no-results">
            <p>
              {searchQuery
                ? `No boards found matching "${searchQuery}"`
                : `No ${selectedCategory !== "all" ? selectedCategory : ""} boards found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
