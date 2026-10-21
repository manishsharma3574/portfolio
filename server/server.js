

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const path = require("path");
const fs = require("fs");

const app = express();

// Allowed frontend domains
const allowedOrigins = [
  "https://portfolio-ai0066.vercel.app",
  "https://portfolio-eight-coral-21.vercel.app"
];

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Manish's Portfolio API is running!");
});

// Resume download route
app.get("/api/resume", (req, res) => {
  const resumePath = path.join(__dirname, "resume.pdf");

  if (!fs.existsSync(resumePath)) {
    return res.status(404).send("Resume PDF not found.");
  }

  res.download(resumePath, "Manish_Sharma_Resume.pdf");
});

// Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and message."
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      message.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "Input is too long."
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Contact message saved successfully!",
      id: contact._id
    });
  } catch (error) {
    console.error("Contact save error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save contact message."
    });
  }
});

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
