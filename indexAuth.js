require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var Buffer = require("buffer/").Buffer;
const multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, (error) => {
  if (error) {
    console.log("Error: " + Error);
  } else {
    console.log(`Server is running at port ${port}`);
  }
});

//Connecting mongoose
function connection() {
  try {
    mongoose.connect(process.env.DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Failed to connect to database" + error.message);
  }
}
connection();

//storing return value of token
function getSingedToken(payload) {
  let options = {
    expiresIn: "365d",
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
}

let payload_username;

//Creating schema for login
const schema = new mongoose.Schema({
  username: "string",
  password: "string",
  role: "string",
});
const login = mongoose.model("login", schema);

// Login route
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // parsing token to extract username
  let token = getSingedToken({ username });
  payload_username = parseJwt(token).username;
  console.log("payload: ", payload_username);

  try {
    const user = await login.findOne({ username });
    if (user && user.password === password && user.role === "student") {
      res.json({
        error: false,
        token: getSingedToken({ username }),
        role: "student",
      });
    } else if (user && user.password === password && user.role === "hospital") {
      res.json({
        error: false,
        token: getSingedToken({ username }),
        role: "hospital",
      });
    } else {
      res.json({
        error: true,
        message: "Incorrect credentials",
      });
    }
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  }
});

//Function for authenticating token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) {
    return res.json({
      error: true,
      message: "Token does not exist",
    });
  }

  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.json({
        error: true,
        message: "Wrong token received",
      });
    }
    req.user = data;
    next();
  });
}

app.post("/register", async (req, res) => {
  // take input from user
  // jo bhi client ne username aur password bheja
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      error: true,
      message: "username/ password nahi bheja",
    });
  }
  try {
    const doesExist = await login.findOne({ username });
    if (doesExist) {
      return res.json({
        error: true,
        message: "aur kisi ka account already hai iss username se",
      });
    }

    const newUser = new login({ username, password, role });
    await newUser.save();
    return res.json({
      error: false,
      message: "register kar liya",
    });
  } catch (err) {
    return res.json({
      error: true,
      message: err.message,
    });
  }
});
