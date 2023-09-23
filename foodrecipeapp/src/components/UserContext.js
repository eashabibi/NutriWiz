import React, { createContext, useState, useContext, useEffect } from "react";

// Step 1: Create a new context
const UserContext = createContext();

// Step 2: Create a provider component
export function UserProvider({ children }) {
  // Step 3: Define a state variable to hold the username
  const [UserName, setUsername] = useState("");

  // Create a function to update the username
  const setUserName = (newUsername) => {
    setUsername(newUsername);
    // Step 4: Store the username in local storage
    localStorage.setItem("username", newUsername);
  };

  // Step 5: Use useEffect to retrieve the username from local storage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <UserContext.Provider value={{ UserName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

// Step 6: Export the provider component and the context itself
export function useUser() {
  return useContext(UserContext);
}
