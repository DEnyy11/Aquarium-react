import React from "react";
import { useState } from "react";
import "./FishesForm.css";

function FishesForm({ data, onAdd }) {
  const [valid, setValid] = useState(false);
  const [newFish, setNewFish] = useState({
    id: data.length > 0 ? Math.max(...data.map((fish) => fish.id)) + 1 : 1,
    name: "",
    type: "",
  });

  const handleChange = (e) => {
    const source = e.target.name;
    const val = e.target.value;
    let updatedFish;
    switch (source) {
      case "name": {
        updatedFish = { ...newFish, name: val };
        break;
      }
      case "type": {
        updatedFish = { ...newFish, type: val };
        break;
      }
      default:
        break;
    }
    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  const validateData = (fish) => {
    if (fish.name.trim().length > 0 && fish.type !== "") {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const resetNewFish = () => {
    const temp = {
      id: newFish.id + 1,
      name: "",
      type: "",
    };
    setNewFish(temp);
    validateData(temp);
  };

  return (
    <div className="fish-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        value={newFish.name}
        onChange={handleChange}
      />
      <select
        name="type"
        id="type"
        value={newFish.type}
        onChange={handleChange}
      >
        <option value="" disabled selected>
          Choose type
        </option>
        <option value="big">big</option>
        <option value="small">Small</option>
      </select>
      <button
        disabled={!valid}
        onClick={() => {
          resetNewFish();
          onAdd(newFish);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default FishesForm;
