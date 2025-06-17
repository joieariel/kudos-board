import React from "react";
import KudosCard from "./KudosCard";
import kudosData from "./data/data";
import "./CardList.css";

const CardList = () => {
  return (
    <div className="card-list-container">
      <h2 className="section-title">Kudos Board</h2>
      <div className="card-grid">
        {kudosData.map((card) => (
          <div key={card.id} className="card-grid-item">
            <KudosCard title={card.title} img={card.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
