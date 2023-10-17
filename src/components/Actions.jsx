import { useState } from "react";
function Actions({
  sortCategory,
  onSortChange,
  filterCategory,
  onFilterChange,
}) {
  return (
    <div className="actions">
      <select
        value={sortCategory}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="date">Sort by date</option>
        <option value="desc">Sort by description</option>
        <option value="status">Sort by status</option>
      </select>
      <select
        value={filterCategory}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );
}

export default Actions;
