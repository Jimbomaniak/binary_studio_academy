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

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    users.push(req.body);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
});

db.connect(db.my_db, (err) => {
    if (err) {
        console.log('No connection to database');
    } else {
        app.listen(4321, () => {
            console.log('Messapp on port: 4321');
        })
    }
});
