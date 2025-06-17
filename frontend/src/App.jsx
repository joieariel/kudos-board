import React, { useState } from "react";
import "./App.css";
import Banner from "./Banner.JSX";
import BoardList from "./BoardList";
import BoardPage from "./BoardPage";

const App = () => {
  // state to track the currently selected board
  const [selectedBoard, setSelectedBoard] = useState(null);

  // function to view a specific board
  const handleViewBoard = (board) => {
    setSelectedBoard(board);
  };

  // function to go back to the board list
  const handleBackToList = () => {
    setSelectedBoard(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kudos Board 🎉</h1>
      </header>

      {selectedBoard ? (
        // show the board page when a board is selected
        <main className="main-content">
          <BoardPage board={selectedBoard} onBack={handleBackToList} />
        </main>
      ) : (
        // show the main content when no board is selected
        <>
          <div className="banner-container">
            <Banner />
          </div>
          <main className="main-content">
            <BoardList onViewBoard={handleViewBoard} />
          </main>
        </>
      )}

      <footer className="App-footer">
        <p>&copy; 2025 Kudos Board by Joie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
