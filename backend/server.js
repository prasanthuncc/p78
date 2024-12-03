const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To allow cross-origin requests
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const jwt = require('jsonwebtoken');
const {expressjwt: exjwt} = require('express-jwt')
app.use(cors());
const mySecretKey = "My Super Secret Key";

const jwtMW = exjwt({
    secret: mySecretKey, algorithms: ['HS256']
});
const uri = "mongodb+srv://user1:Hermosa444@test.bixktb6.mongodb.net/nbad?retryWrites=true&w=majority";


mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const placardSchema = new mongoose.Schema({
    placards: {
        type: [String], required: true,
    }, techStack: {
        type: String, required: true,
    }, quote: {
        type: String, required: true,
    },
});

const Placard = mongoose.model('placards', placardSchema);

// Route to get placards
app.get('/api/placards', async (req, res) => {
    try {
        const placards = await Placard.find();
        res.json(placards);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

const prasanth = "prasanth";
let users = [{
    id: 1, username: prasanth, password: prasanth
}];


app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    let foundUser = false;
    for (let user of users) {
        if (username === user.username && password === user.password) {
            let token = jwt.sign({id: user.id, username: user.username}, mySecretKey, {expiresIn: '1h'});
            res.json({
                success: true, err: null, token
            });
            foundUser = true;
            break;
        }
    }
    if (foundUser === false) {
        res.status(401).json({
            success: false, token: null, err: "Username and Password doesn't match"
        });
    }
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true, myContent: 'Secret Content that can only be visible to logged in people!!!'
    });
});

app.get('/api/summary', jwtMW, (req, res) => {
    console.log(req);
    res.json({
        success: true, myContent: 'Settings Page!'
    });
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false, officialError: err, err: "Username and Password is incorrect 2"
        });
    } else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
