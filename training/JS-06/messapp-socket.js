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

    socket.on('userTyping', (usr) => {
        io.emit('typing', usr)
    });

    socket.on('login', (usr) => {
        setTimeout(() => {
            if (usr.status !== 'user__status_online') {
                usr.status = 'user__status_online';
                io.emit('updateStatus', usr);
            }
        }, 60000);

        usr._id = _id;
        users.push(usr);
        socket.emit('history', messages);
        io.emit('login', usr);

    });

    socket.on('setStatus', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        let departed = users.find(user => user._id === _id);
        if (departed) {
            departed.status = 'user__status_offline';
            io.emit('userLeft', departed);
        }
        io.emit('userList', users);
    });

    socket.emit('userList', users);
});

http.listen(4321, () => {
    console.log('Running on port: 4321');
});

// --- Over 100 messages test helper ---
// for (let i=0; i < 99; i++){
//     messages.push({
//         nickname: 'Filler',
//         text: `${i}`,
//         createdAt: new Date(),
//     });
// }
