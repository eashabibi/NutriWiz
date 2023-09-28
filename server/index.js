const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // Add this line
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Define Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile_pictures"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    const filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.post(
  "/setprofilepicture",
  upload.single("profilePicture"),
  async (req, res) => {
    const email = req.body.mailid;
    try {
      // Get the user document from Firestore
      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user's profilePicture field with the uploaded file's filename
      await userRef.update({ profilePicture: req.file.filename });

      res.json({ success: true });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);
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
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store user data in Firestore with hashed password
      await userRef.set({ email, password: hashedPassword, username });

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
      const hashedPassword = userDoc.data().password;

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const username = userDoc.data().username;
        res
          .status(200)
          .json({ message: "User logged in successfully", username });
      } else {
        // Invalid password
        res.status(402).json({ message: "Incorrect Passsword" });
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

// Endpoint for getting a user's profile picture using POST
app.post("/getprofilepicture", async (req, res) => {
  try {
    const email = req.body.email;

    // Check if the email is provided in the request body
    if (!email) {
      return res
        .status(400)
        .json({ error: "Email is required in the request body" });
    }

    // Get the user document from Firestore
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const profilePicture = userDoc.data().profilePicture;

    if (!profilePicture) {
      return res
        .status(404)
        .json({ error: "Profile picture not found for this user" });
    }

    // Send the profile picture file as a response
    res.sendFile(path.join(__dirname, "profile_pictures", profilePicture));
  } catch (error) {
    console.error("Error getting profile picture:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
