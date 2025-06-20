import React, { useState } from "react";
import "./App.css";
import Banner from "./Banner.jsx";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import BoardList from "./BoardList";
import BoardPage from "./BoardPage";

const App = () => {
  // state to track the currently selected board
  const [selectedBoard, setSelectedBoard] = useState(null);
  // state to track the search query
  const [searchQuery, setSearchQuery] = useState("");
  // state to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
        <button className="toggle-button">Dark Mode</button>
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
          <SearchBar onSearch={handleSearch} />
          <FilterDropdown
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <main className="main-content">
            <BoardList
              onViewBoard={handleViewBoard}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
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
