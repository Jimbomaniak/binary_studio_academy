let userName = getById('form__name');
let userNick = getById('form__nick');
let pageChat = getByClass('b-page__chat')[0];
let loginForm = getByClass('login__form')[0];
let usersList = getByClass('users__list')[0];
let messages = getByClass('messages')[0];
let message = getByClass('send-form__input')[0];
let sendButton = getByClass('send-form__button')[0];
let headerUsername = getByClass('header__username')[0];

let sock = io.connect();

loginForm.onsubmit = (e) => {
    e.preventDefault();
    login();
};

sendButton.parentElement.onsubmit = (e) => {
    e.preventDefault();
    if (!message.value) {return}
    sendMessage();
};
sendButton.onclick = () => {
    if (!message.value) {return}
    sendMessage();
};

function login() {
    let credentials = {
        userName: userName.value,
        userNick: userNick.value,
        loggedAt: new Date(),
    };
    headerUsername.innerHTML = credentials.userName;
    pageChat.style.animation = 'fadeIn 1s ease-in';
    pageChat.style.display = 'block';
    loginForm.style.display = 'none';
    sock.emit('login', credentials)
}

function sendMessage() {
    let data = {
        nickname: userNick.value,
        text: message.value,
        createdAt: new Date(),
    };
    message.value = '';
    sock.emit('message', data);
}

sock.on('history', (msgs) => {
    while (messages.hasChildNodes()) {
        messages.removeChild(messages.firstChild);
    }
    for (let msg of msgs) {
        let el = document.createElement('li');
        el.classList.add('message');
        if (msg.text.split(' ').includes(`@${userNick.value}`)){
            el.classList.add('message_directed');
        }
        let formattedTime = new Date(msg.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        el.innerHTML = `${formattedTime} <b>${msg.nickname}</b>: ${msg.text}`;
        messages.appendChild(el);
    }
});

sock.on('message', (msg) => {
    let el = document.createElement('li');
    el.classList.add('message');
    if (msg.text.split(' ').includes(`@${userNick.value}`)){
        el.classList.add('mesasdsage_directed');
    }
    let formattedTime = new Date(msg.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    el.innerHTML = `${formattedTime} <b>${msg.nickname}</b>: ${msg.text}`;
    messages.appendChild(el);
});

sock.on('userList', (usrs) => {
    for (let user of usrs) {
        let el = document.createElement('li');
        el.classList.add('list__user');
        let status = document.createElement('span');
        status.classList.add('user__status');
        el.appendChild(status);
        let nick = document.createElement('i');
        nick.innerHTML = `${user.userName} | ${user.userNick}`;
        el.appendChild(nick);
        usersList.appendChild(el);
    }
});

sock.on('login', (user) => {
    let el = document.createElement('li');
    el.classList.add('list__user');
    let status = document.createElement('span');
    status.classList.add('user__status');
    el.appendChild(status);
    let nick = document.createElement('i');
    nick.innerHTML = `${user.userName} | ${user.userNick}`;
    el.appendChild(nick);
    usersList.appendChild(el);
});

function getByClass(cl) {
    return document.getElementsByClassName(cl);
}
function getById(_id) {
    return document.getElementById(_id);
}