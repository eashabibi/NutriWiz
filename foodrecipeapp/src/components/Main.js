import React, { useState, Fragment, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../app.css";
import RecipeTile from "./RecipeTile";
import WelcomePage from "./WelcomePage";
import NoFood from "../images/sadfood.gif";
import { useUser } from "./UserContext";

const Main = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Added state variable
  const Navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { UserName } = useUser();
  const YOUR_APP_ID = "82e453da";
  const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const getRecipeInfo = async () => {
    setLoading(true);
    try {
      const result = await Axios.get(url);
      setRecipes(result.data.hits);
      console.log(result.data.hits);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
    setShowWelcome(false); // Remove the welcome page after clicking "Search"
  };

  const handleLogout = () => {
    Navigate("/");
  };

  // Create a ref for the input field to manage autoFocus
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the welcome page is removed
    if (!showWelcome) {
      inputRef.current.focus();
    }
  }, [showWelcome]);

  return (
    <Fragment>
      <div className="app">
        <div className="header">
          <h1 onClick={getRecipeInfo}>Food Recipe Plaza 🍔</h1>
          <form className="app__searchForm" onSubmit={onSubmit}>
            <input
              className="app__input"
              type="text"
              placeholder="Enter ingredient"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus // Auto focus on the input field
              ref={inputRef} // Set the ref for the input field
            />
            <input className="app__submit" type="submit" value="Search" />
          </form>
          <button onClick={handleLogout}>Logout</button>
          <div className="username" onClick={toggleProfile}>
            {UserName.charAt(0)}
          </div>
          {showProfile && (
            <div className="profile-block">
              <div className="full-username">{UserName}</div>
            </div>
          )}
        </div>

        {showWelcome ? (
          <div className="welcome-container">
            <WelcomePage />
          </div>
        ) : loading ? (
          <div className="pan-loader">
            <div className="loader"></div>
            <div className="pan-container">
              <div className="pan"></div>
              <div className="handle"></div>
            </div>
            <div className="shadow"></div>
          </div>
        ) : (
          <div className="app__recipes">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeTile key={recipe.recipe.uri} recipe={recipe.recipe} />
              ))
            ) : (
              <div>
                <div className="nofood">
                  <div className="matter">
                    <h1>Oops..!</h1>
                    <p>No recipes found. Please try a different search.</p>
                    <p>Here are some tips:</p>
                    <ul>
                      <li>
                        🍟 Check your spelling and try different keywords.
                      </li>
                      <li>
                        🌮 Try searching for a specific ingredient or cuisine.
                      </li>
                      <li>🍱 Make sure your search is not too narrow.</li>
                    </ul>
                  </div>
                  <di className="sadfood">
                    <img src={NoFood} alt="No food" />
                  </di>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Main;
