import React, { useState } from "react";
import { default as api } from "../components/store/apiSlice";
const SearchForm = () => {
  const [targetName, setTargetName] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSearch = () => {
    // TODO: Implement search functionality to find the vehicle ID
    // and set the values of quantity and moisture if found.
    // Example:
    if (targetName === "123") {
        setTimeAvailable("10");
        setTimePeriod("5");
      setShowForm(true);
    } else {
      // Handle case where the vehicle ID is not found.
      alert("TargetName not found!");
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality to update the details
    // of the vehicle with the given ID. Example:
    alert(
      `Saved TargetName ${targetName}: TimeAvailable=${timeAvailable}, TimePeriod=${timePeriod}`
    );
    setShowForm(false);
  };

  return (
    <div>
      <label>
        Search Target Name:
        <input
          type="text"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      {showForm && (
        <div>
          <label>
          Time Available:
            <input
              type="text"
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
            />
          </label>
          <label>
          Time Period:
            <input
              type="text"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            />
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
