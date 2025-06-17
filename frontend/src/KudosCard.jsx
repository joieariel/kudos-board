import React from "react";
import "./KudosCard.css";

const KudosCard = ({ title, img }) => {
  return (
    <div className="kudos-card">
      <img src={img} alt={title} className="kudos-image" />
      <div className="kudos-content">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default KudosCard;
