require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel, contentModel } = require("./db");
const authMiddleware = require("./middleware");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connect successfully");
    console.log("Database : ", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("DB connection error", error);
    process.exit(1);
  }
};

app.post("/api/v1/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      console.log("Username or password is missing");
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      console.log("Username already exists");
      return res.status(411).json({
        message: "User already exits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User signed up successfully",
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
  }
});
app.post("/api/v1/signin", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      console.log("Username or password is missing");
      return res.status(400).json({
        message: "Username and password are required",
      });
    }
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      console.log("User not found : ", username);
      return res.status(411).json({
        message: "User doesn't exist",
      });
    }

    const flag = await bcrypt.compare(password, existingUser.password);

    if (!flag) {
      console.log("Incorrect password");
      return res.status(403).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

    return res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.error("Signin Error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  try {
    const { title, message, unlockAt } = req.body;

    if (!title || !message || !unlockAt) {
      return res.status(400).json({
        message: "Title, message and unlock time are required",
      });
    }

    const newContent = await contentModel.create({
      title,
      message,
      unlockAt: new Date(unlockAt),
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Content saved successfully",
      content: newContent,
    });
  } catch (error) {
    console.log("Error creating content", error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const allContent = await contentModel.find({ userId });

    return res.status(200).json({
      message: "Fetched Content Successfully",
      count: allContent.length,
      content: allContent,
    });
  } catch (error) {
    console.error("Error fetching content, ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/v1/content/:id", authMiddleware, async (req, res) => {
  try {
    const contentId = req.params.id;
    if (!contentId || contentId === "undefined") {
      return res.status(400).json({
        message: "Invalid content ID provided",
      });
    }

    const result = await contentModel.deleteOne({
      _id: contentId,
      userId: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(400).json({
        message: "Content not found",
      });
    }
    res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error("Delete error", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
