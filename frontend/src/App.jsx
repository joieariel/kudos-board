import React from "react";
import "./App.css";
import Banner from "./Banner.JSX";
import CardList from "./CardList";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kudos Board 🎉</h1>
      </header>
      <div className="banner-container">
        <Banner />
      </div>

      <main className="main-content">
        <CardList />
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Kudos Board by Joie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
