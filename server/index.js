const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// user register
app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Check if a user with the same email already exists
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // User with the same email already registered
      res.status(400).json({ message: "You are already registered" });
    } else {
      // Store user data in Firestore with plain text password (not recommended)
      await userRef.set({ email, password, username });

      // Respond with the username
      res
        .status(201)
        .json({ message: "User registered successfully", username });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Retrieve user data from Firestore
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const storedPassword = userDoc.data().password;

      if (password === storedPassword) {
        const username = userDoc.data().username;
        res
          .status(200)
          .json({ message: "User logged in successfully", username });
      } else {
        // Invalid password
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // User does not exist
      res.status(401).json({ message: "Not a valid user" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

console.log("Asha");

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

