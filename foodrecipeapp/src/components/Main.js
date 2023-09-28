import React, { useState, Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";
import { toast } from "react-toastify";
import RecipeTile from "./RecipeTile";
import WelcomePage from "./WelcomePage";
import NoFood from "../images/sadfood.gif";
import { useUserContext } from "./UserContext";
import Confetti from "react-confetti";

const Main = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const Navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const { userName, userEmail } = useUserContext();
  const [profilePictureData, setProfilePictureData] = useState(null);

  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(true);

  const YOUR_APP_ID = "82e453da";
  const YOUR_APP_KEY = "3bb5d1a3b992f408b9003effd74c9c22";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleUsername = () => {
    setShowUsername(!showUsername);
  };

  const getRecipeInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
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
    setShowWelcome(false);
  };

  const handleLogout = () => {
    Navigate("/");
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (!showWelcome) {
      inputRef.current.focus();
    }
  }, [showWelcome]);

  useEffect(() => {
    // Set the timeout
    const timeoutId = setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000);

    // Return a cleanup function
    return () => {
      clearTimeout(timeoutId);
      

    };
  }, []);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const profilePictureInputRef = useRef(null);

  const handleSelectProfilePicture = () => {
    profilePictureInputRef.current.click();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePicture(file);
  };

  const handleUploadProfilePicture = async () => {
    if (!selectedProfilePicture) {
      return;
    }
    setUploadingProfilePicture(true); // Set loading state to true

    const formData = new FormData();
    formData.append("profilePicture", selectedProfilePicture);
    formData.append("mailid", userEmail);

    try {
      const response = await fetch("http://localhost:5000/setprofilepicture", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        // alert("Profile picture uploaded successfully!");

        // Fetch and update the profile picture immediately
        getProfilePicture();

        // Hide the profile block
        setShowProfile(false);
      } else {
        toast.error("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    } finally {
      setUploadingProfilePicture(false);
    }
  };

  const getProfilePicture = async () => {
    try {
      const response = await fetch("http://localhost:5000/getprofilepicture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.status === 200) {
        const imageBlob = await response.blob(); // Get the image data as a Blob
        const imageUrl = URL.createObjectURL(imageBlob); // Convert Blob to a data URL
        setProfilePictureData(imageUrl);
      } else {
        console.log("Profile picture not found for this user.");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  useEffect(() => {
    // Fetch the user's profile picture when the component mounts
    getProfilePicture();
  }, [userEmail]);

  return (
    <Fragment>
      <div className="app">
        <div className="header">
          <h1 onClick={getRecipeInfo}>NutriWiz Plaza 🍔</h1>
          <form className="app__searchForm" onSubmit={onSubmit}>
            <input
              className="app__input"
              type="text"
              placeholder="Enter ingredient"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              ref={inputRef}
            />
            <input className="app__submit" type="submit" value="Search" />
          </form>
          <button onClick={handleLogout}>Logout</button>
          {profilePictureData ? (
            <img
              onClick={toggleProfile}
              src={profilePictureData}
              alt="Profile"
              className="username profile-picture"
            />
          ) : (
            <div className="username" onClick={toggleProfile}>
              {userName.charAt(0)}
            </div>
          )}
          {showProfile && (
            <div className="profile-block">
              <div className="full-username">
                <b>Username:</b> {userName}
              </div>
              <div className="full-username">
                <b>Email:</b> {userEmail}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                ref={profilePictureInputRef}
                style={{ display: "none" }}
              />

              {uploadingProfilePicture && (
                <div className="loading-container">
                  <div className="loading-circle"></div>
                </div>
              )}
              <button onClick={handleSelectProfilePicture}>
                Select Profile
              </button>
              <button onClick={handleUploadProfilePicture}>
                Upload Profile
              </button>
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
                  <div className="sadfood">
                    <img src={NoFood} alt="No food" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {showUsername && <div className="username-display">{userName}</div>}
      </div>
      {isConfettiActive && <Confetti />}
    </Fragment>
  );
};

export default Main;
