import { useState } from "react";
import "./App.css";
import rawData from "./fishesData.json";
import FishesList from "./components/FishesList/FishesList";
import FishesForm from "./components/FishesForm/FishesForm";

function App() {
  const [listOfFishes, setListOfFishes] = useState(rawData.fishes);
  const [activeTab, setActiveTab] = useState(1);
  const [valid, setValid] = useState(false);
  const [tempAquarium, setTempAquarium] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const handleDelete = (idToDelete) => {
    const temp = listOfFishes.filter((fish) => fish.id !== idToDelete);
    setListOfFishes(temp);
  };
  const handleAdd = (fishToAdd) => {
    setListOfFishes([...listOfFishes, fishToAdd]);
  };
  const handleAquarium = (e) => {
    const source = e.target.name;
    switch (source) {
      case "width": {
        setTempAquarium({ ...tempAquarium, width: e.target.value });
        break;
      }
      case "height": {
        setTempAquarium({ ...tempAquarium, height: e.target.value });
        break;
      }
      case "depth": {
        setTempAquarium({ ...tempAquarium, depth: e.target.value });
        break;
      }
      default:
        break;
    }
    validateAquarium();
  };
  const validateAquarium = (fish) => {
    let minLiters = 0;
    let aquariumLiters = 0;
    for (let index = 0; index < listOfFishes.length; index++) {
      if (listOfFishes[index].type === "big") minLiters += 20;
      else if (listOfFishes[index].type === "small") {
        minLiters += 10;
      }
    }

    aquariumLiters =
      (tempAquarium.depth * tempAquarium.width * tempAquarium.height) / 1000;

    if (aquariumLiters < minLiters) {
      setValid(false);
    } else if (aquariumLiters >= minLiters) {
      setValid(true);
    }
  };
  const handleClick = () => {
    alert("You made it! This aquarium is awesome!");
  };

  return (
    <div className="page-container">
      <div className="page-toggler">
        <button
          className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
          name="list-of-fishes"
          onClick={() => setActiveTab(1)}
        >
          List of fishes
        </button>
        <button
          className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
          name="aqvarium"
          onClick={() => setActiveTab(2)}
        >
          Aquarium
        </button>
      </div>
      {activeTab === 1 && (
        <>
          <FishesList data={listOfFishes} onDelete={handleDelete} />
          <FishesForm data={listOfFishes} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h1>Aquarium design</h1>
          <div className="akva-form">
            <h2>Enter size in centimeters</h2>
            <input
              type="number"
              name="width"
              id="width"
              placeholder="width"
              value={tempAquarium.width}
              onChange={handleAquarium}
            />
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              value={tempAquarium.height}
              onChange={handleAquarium}
            />
            <input
              type="number"
              name="depth"
              id="depth"
              placeholder="depth"
              value={tempAquarium.depth}
              onChange={handleAquarium}
            />
            <button
              onClick={handleClick}
              disabled={!valid}
              className={valid ? "btn-valid" : "btn-invalid"}
            >
              Approve
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
