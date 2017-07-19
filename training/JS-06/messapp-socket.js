let path = require('path');
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let messages = [];
let users = [];
let counter = 0;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index-sock.html'))
});

app.get('/services/chat_sock.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/services/chat_sock.js'))
});

io.on('connection', (socket) => {
    console.log('Incoming connection');
    let _id = ++counter;

    socket.on('message', (msg) => {
        if (messages.length > 100) {
            messages.shift();
            socket.emit('history', messages);
        }
        messages.push(msg);
        io.emit('message', msg);
    });

    socket.on('login', (usr) => {
        usr._id = _id;
        users.push(usr);
        socket.emit('history', messages);
        io.emit('login', usr);
    });

    socket.on('disconnect', () => {
        let departed = users.find((user) => {
            return user._id === _id;
        });
        users = users.filter((user) => {
            return user._id !== _id;
        });
        io.emit('userLeft', departed);
        io.emit('userList', users);
    });

    socket.emit('userList', users);
});

http.listen(4321, () => {
    console.log('Running on port: 4321');
});

// for (let i=0; i < 95; i++){
//     messages.push({
//         nickname: 'Filler',
//         text: `${i}`,
//         createdAt: new Date(),
//     });
// }
