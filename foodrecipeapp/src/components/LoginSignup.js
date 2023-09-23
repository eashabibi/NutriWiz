import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { toast } from "react-toastify"; // Import toast for notifications
import Nav from "./Nav";
import { useUser } from "./UserContext";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { UserName, setUserName } = useUser();

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  // ... (previous code)

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }), // Replace `newUsername` with `username`
      });

      if (response.status === 201) {
        const data = await response.json();
        const { username } = data;

        // Registration successful
        toast.success("Registration successful");
        setUserName(username);
        console.log(UserName);
        navigate("/main");
      } else if (response.status === 400) {
        // User with the same email already registered
        toast.error("You are already registered");
      } else {
        // Handle other registration errors
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle network error or other issues
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { username } = data;

        // Login successful
        toast.success("Login successful");
        setUserName(username);
        console.log(UserName);
        navigate("/main");
      } else if (response.status === 401) {
        // Not a valid user
        toast.error("Not a valid user");
      } else {
        // Handle other login errors
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network error or other issues
    }
  };

  // ... (rest of the code)

  return (
    <Fragment>
      <Nav></Nav>
      <div className="loginsignup">
        <div
          className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <div className="social-container">
                <Link to="/" className="social">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="social">
                  
                  <i className="fab fa-google-plus-g"></i>
                </Link>
                <Link to="/" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <div className="social-container">
                <Link to="/" className="social">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to="/" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </Link>
                <Link to="/" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to="/">Forgot your password?</Link>
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
