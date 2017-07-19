let path = require('path');
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let messages = [];

for (let i=0; i < 95; i++){
    messages.push({
        nickname: 'Filler',
        text: `${i}`,
        createdAt: new Date(),
    });
}

let users = [];

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index-sock.html'))
});

app.get('/services/chat_sock.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/services/chat_sock.js'))
});

io.on('connection', (socket) => {
    console.log('Incoming connection');

    socket.on('message', (msg) => {
        if (messages.length > 100) {
            messages.shift();
            socket.emit('history', messages);
        }
        messages.push(msg);
        io.emit('message', msg);
    });

    socket.on('login', (usr) => {
        users.push(usr);
        socket.emit('history', messages);
        io.emit('login', usr);
    });
    socket.emit('userList', users);
});

io.on('disconnected', () => {
    console.log('Disconnected');
});
// app.post('/users', (req, res) => {
//     users.push(req.body);
// });
// app.post('/messages', (req, res) => {
//     if (messages.length > 100) {
//         messages.shift();
//     }
//     messages.push(req.body);
// });

http.listen(4321, () => {
    console.log('Running on port: 4321');
});
