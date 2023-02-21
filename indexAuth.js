require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(4000, () => {
    console.log("server running at PORT 5000");
});

let data = {
    'usernames': usernames = [],
    'passwords': passwords = []
}

let authToken = '';

app.delete("/logout", (req, res) => {
    authToken == '';
    res.redirect('/login');
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    data.usernames.push({username, password}.username);

    try {
        const hashedPassword = await bcrypt.hash({username, password}.password, 10);
        data.passwords.push(hashedPassword);
    } catch {
        return res.redirect('/login');
    }

    const accessToken = jwt.sign({username, password}, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    authToken = authHeader && authHeader.split(' ')[1];
    if(!authToken) {
        return res.sendStatus(401);
    }

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, function(err, data) {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}