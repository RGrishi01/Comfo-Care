require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(4000, () => {
    console.log("server running at PORT 4000");
});

//Connecting mongoose
const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://shivansh-12:shivansh@cluster0.vvpfe.mongodb.net/comfo-care?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('Connected to the Database!!')

    } catch (err) {
        console.log('Database Connection failed: '+ err.message)
    }
};
connection();

//Creating schema for login
const schema = new mongoose.Schema({ username: 'string', password: 'string', role: 'string'});
const login = mongoose.model('login', schema);

// Login route
app.post("/login", async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;

    try {  
        const user = login.findOne({ username });  
        if(user && user.password === password && user.role === "student") {
            res.json({
                error: false,
                token: getSingedToken({ username }),
                role: "student"
            })
        } else if(user && user.password === password && user.role === "hospital") {
            res.json({
                error: false,
                token: getSingedToken({ username }),
                role: "hospital"
            })
        } else {
            res.json({
                error: true,
                message: "Incorrect credentials"
            })
        }
    } catch(err) {
        res.json({
            error: true,
            message: err.message
        })
    }
});


app.post("/report", authenticateToken, async (req, res) => {
    // const {report} = req.body;
    console.log(req.user)
    res.json({
        error: false,
        message: "Report saved"
    })
});

function getSingedToken(payload) {
    let options = {
        expiresIn: "365d",
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)
}

//Function for authenticating token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    authToken = authHeader && authHeader.split(' ')[1];
    if(!authToken) {
        return res.json({
            error: true,
            message: "Token does not exist"
        });
    }

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            return res.json({
                error: true,
                message: "Wrong token received"
            });
        }
        req.user = data;
        next();
    })
}

// const schema2 = new mongoose.Schema({ username: {type: 'string', ref: login}, report: 'string'});
// const reports = mongoose.model('reports', schema2);

// app.get("/hospital", authenticateToken, async (req, res) => {
//     const user2 = await reports.findOne({ username });

//     if(user2.username === user.password){}

// });





// app.post("/register", async (req, res) => {

//     // take input from user
//     // jo bhi client ne username aur password bheja
//     const {username, password} = req.body;
//     if(!username || !password) {
//         return res.json({
//             error: true,
//             message: "username/ password nahi bheja"
//         })
//     }

//     try {

//         const doesExist = await login.findOne({ username });
//         if(doesExist) {
//             return res.json({
//                 error: true,
//                 message: "aur kisi ka account already hai iss username se",
//             })
//         }

//         const newUser = new login({ username, password, role: "hospital" });
//         await newUser.save();
//         return res.json({
//             error: false,
//             message: "register kar liya"
//         })
//     } catch(err) {
//         return res.json({
//             error: true,
//             message: err.message
//         })
//     }
// });
