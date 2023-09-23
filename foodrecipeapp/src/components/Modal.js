import React, { Fragment } from "react";

const Modal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;
  return (
    <Fragment>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal">
          <div className="image-section">
            <img className="modal-image" alt="" src={recipe.image} />
            <div className="recipe-labels">
              <h1>{recipe.label}</h1>
              <p>
                <b>Calories:</b> {recipe.calories}
              </p>
              <p>
                <b>Dish Type:</b> {recipe.dishType}
              </p>
              <p>
                <b>Meal Type:</b> {recipe.mealType}
              </p>
              <button className="close-button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
          <div className="ingredients">
            <h2>Ingredients:</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>🥣{ingredient.text}</li>
              ))}
            </ul>
          </div>
          <div className="nutrients">
            <h2>Nutrients:</h2>
            <ul>
              {Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                <li key={key}>
                  💪🏻<b>{nutrient.label}</b>: {nutrient.quantity} {nutrient.unit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
