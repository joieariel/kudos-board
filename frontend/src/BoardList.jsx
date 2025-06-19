import React, { useState, useEffect } from "react";
import KudosBoard from "./KudosBoard";
import CreateBoardModal from "./CreateBoardModal";
import "./BoardList.css";

const BoardList = ({ onViewBoard, searchQuery, selectedCategory }) => {
  // state to store and manage the boards data
  const [boards, setBoards] = useState([]);
  // state to store filtered boards
  const [filteredBoards, setFilteredBoards] = useState([]);
  // state to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch boards from backend API
  useEffect(() => {
    const getBoards = async () => {
      try {
        const response = await fetch("http://localhost:3002/boards");
        const data = await response.json();
        setBoards(data);
        setFilteredBoards(data);
      } catch (e) {
        console.error("Error fetching", e);
      }
    };

    getBoards();
  }, []);

  // filter boards when search query or category changes
  useEffect(() => {
    // first, apply category filter
    let categoryFiltered = [...boards];

    if (selectedCategory === "recent") {
      // sort by createdAt date (newest first) and take the 6 most recent
      categoryFiltered = [...boards]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 6);
    } else if (selectedCategory !== "all") {
      // filter by category (which matches the description field) - case insensitive
      categoryFiltered = boards.filter(
        (board) =>
          board.description.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // then apply search filter if there's a search query
    if (!searchQuery) {
      setFilteredBoards(categoryFiltered);
      return;
    }

    // filter boards based on search query
    const searchFiltered = categoryFiltered.filter((board) => {
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

  // function to create a new board
  const createBoard = (newBoard) => {
    // add the new board to the boards array
    const updatedBoards = [...boards, newBoard];
    // update the state with the new array that includes the new board
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
      <div className="board-header">
        <h2 className="section-title">Kudos Board</h2>
        <button className="create-button" onClick={() => setIsModalOpen(true)}>
          <span className="plus-icon">+</span>
          Create New
        </button>
      </div>
      {/* Create Board Modal */}
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBoard={createBoard}
      />

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
                : `No ${
                    selectedCategory !== "all" ? selectedCategory : ""
                  } boards found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
