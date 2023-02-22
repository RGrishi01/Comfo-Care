require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => {
    console.log("server running at PORT 5000");
});

app.get("/hello", authenticateToken, (req, res) => {
    console.log("i am in get")
    res.send("My name is Rishi")
});

let data = {
    usernames: [],
    passwords: []
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1];
    if(!authToken) {
        return res.sendStatus(401);
    }

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = data;
        next();
    })
}