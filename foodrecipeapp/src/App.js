import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import LoginSignup from "./components/LoginSignup";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ToastContainer } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { UserProvider } from "./components/UserContext";

const firebaseConfig = {
  apiKey: "AIzaSyC3vJO0xQ3WlUACS05pFUKBCiiG7xpn-hw",
  authDomain: "fooddata-d2672.firebaseapp.com",
  projectId: "fooddata-d2672",
  storageBucket: "fooddata-d2672.appspot.com",
  messagingSenderId: "603310508809",
  appId: "1:603310508809:web:f06a504e2f6993ea40a1d8",
  measurementId: "G-NS97SZJ5V6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
if (analytics) {
  // pass
}
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<LoginSignup />} />
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
