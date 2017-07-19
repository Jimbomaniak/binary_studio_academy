let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let db = require('./services/db');
let app = express();

let messages = [];
let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/services')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/services/chat_ajax.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/services/chat_ajax.js'))
});

app.post('/users', (req, res) => {
    users.push(req.body);
});

app.post('/messages', (req, res) => {
    if (messages.length > 100) {
        messages.shift();
    }
    messages.push(req.body);
});

app.get('/chat-data', (req, res) => {
    res.json({
        users: users,
        messages: messages,
    })
});

app.listen(4321, () => {
    console.log('Running on port: 4321');
});
