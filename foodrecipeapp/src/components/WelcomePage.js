import React from "react";
import FoodWelcome from "../images/foodwelcome.gif";
const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div>
        <h2>Welcome to the Food Recipe App!</h2>
        <p>Discover, Cook, and Enjoy Delicious Recipes</p>
        <p>Looking for culinary inspiration? You're in the right place.</p>
        <p>With our app, you can:</p>
        <ul>
          <li>💕 Search for a wide variety of recipes.</li>
          <li>🍕 View detailed information about each recipe.</li>
          <li>🥗 Find out ingredients, nutrients, and cooking instructions.</li>
          <li>⭐ Rate and review your favorite recipes.</li>
        </ul>
        <p>Get started now and find your next delightful meal!</p>
      </div>
      <div className="food-image">
        <img src={FoodWelcome} alt="Food Welcome" />
      </div>
    </div>
  );
};

export default WelcomePage;
