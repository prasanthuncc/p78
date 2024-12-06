const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {expressjwt: exjwt} = require('express-jwt');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mySecretKey = "My Super Secret Key";
const jwtMW = exjwt({
    secret: mySecretKey,
    algorithms: ['HS256'],
});

const uri = "mongodb+srv://user1:Hermosa444@test.bixktb6.mongodb.net/nbad?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

const placardSchema = new mongoose.Schema({
    placards: {type: [String], required: true},
    techStack: {type: String, required: true},
    quote: {type: String, required: true},
});

const chartsSchema = new mongoose.Schema({
    low: {
        labels: {type: [String], required: true},
        data: {type: [Number], required: true},
        backgroundColor: {type: [String], required: true},
        hoverBackgroundColor: {type: [String], required: true},
    },
    high: {
        labels: {type: [String], required: true},
        data: {type: [Number], required: true},
        backgroundColor: {type: [String], required: true},
        hoverBackgroundColor: {type: [String], required: true},
    },
    average: {
        labels: {type: [String], required: true},
        data: {type: [Number], required: true},
        backgroundColor: {type: [String], required: true},
        hoverBackgroundColor: {type: [String], required: true},
    },
});

const Placard = mongoose.model('placards', placardSchema);
const ChartData = mongoose.model('charts', chartsSchema);

app.get('/api/placards', jwtMW, async (req, res) => {
    try {
        const placards = await Placard.find();
        res.json(placards);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/api/charts', jwtMW, async (req, res) => {
    try {
        const charts = await ChartData.find();
        res.json(charts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

const prasanth = "prasanth";
let users = [{id: 1, username: prasanth, password: prasanth}];

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({id: user.id, username: user.username}, mySecretKey, {expiresIn: '1h'});
        res.json({success: true, token});
    } else {
        res.status(401).json({success: false, token: null, err: "Invalid username or password"});
    }
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({success: false, err: "Invalid or expired token"});
    } else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
