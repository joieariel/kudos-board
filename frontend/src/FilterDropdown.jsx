import React from "react";
import "./FilterDropdown.css";

// component for filtering boards by category
const FilterDropdown = ({ selectedCategory, onCategoryChange }) => {
  // handle category change when user selects a different option
  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className="filter-container">
      {/* label for the dropdown */}
      <label htmlFor="category-filter" className="filter-label">
        Filter Boards:
      </label>
      {/* select dropdown with category options */}
      <select
        id="category-filter"
        className="filter-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {/* option to show all boards */}
        <option value="all">All Boards</option>
        {/* option to show 6 most recent boards */}
        <option value="recent">Recent (6)</option>
        {/* category filter options */}
        <option value="Celebration">Celebration</option>
        <option value="Thank you">Thank You</option>
        <option value="Inspiration">Inspiration</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
