import React from "react";
import "./FishesList.css";

function FishesList({ data, onDelete }) {
  return (
    <div className="list">
      {data.map((item) => {
        return (
          <div key={item.id} className="item">
            <span>
              Name - {item.name}, type - {item.type}
            </span>
            <button className="btn-delete" onClick={() => onDelete(item.id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FishesList;
