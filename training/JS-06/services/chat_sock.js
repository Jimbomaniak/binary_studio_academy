const [ONLINE, OFFLINE, APPEARED] = [
    'user__status_online',
    'user__status_offline',
    'user__status_just-appeared'];

let userName = getById('form__name');
let userNick = getById('form__nick');
let pageChat = getByClass('b-page__chat')[0];
let loginForm = getByClass('login__form')[0];
let usersList = getByClass('users__list')[0];
let messages = getByClass('messages')[0];
let message = getByClass('send-form__input')[0];
let sendButton = getByClass('send-form__button')[0];
let headerUsername = getByClass('header__username')[0];
let tooltip = getByClass('main__tooltip')[0];
let sock = io.connect();

loginForm.onsubmit = (e) => {
    e.preventDefault();
    if(validateName(userNick.value)) {
        login();
    }
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

message.onkeypress = (e) => {
    sock.emit('userTyping', {user: userName.value})
};

sock.on('typing', (usr) => {
    tooltip.style.display = 'block';
    tooltip.innerHTML = `@${usr.user} is typing...`;
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 2000)
});

function login() {
    let credentials = {
        userName: userName.value,
        userNick: userNick.value,
        loggedAt: new Date(),
        status: APPEARED,
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

sock.on('message', createMessage);

sock.on('history', (msgs) => {
    while (messages.hasChildNodes()) {
        messages.removeChild(messages.firstChild);
    }
    for (let msg of msgs) {
        createMessage(msg);
    }
});

sock.on('login', newUser);

sock.on('userList', (usrs) => {
    while (usersList.hasChildNodes()) {
        usersList.removeChild(usersList.firstChild);
    }
    for (let user of usrs) {
        newUser(user);
    }
});

function createMessage(msg) {
    let el = document.createElement('li');
    el.classList.add('message');
    if (msg.text.split(' ').includes(`@${userNick.value}`)){
        el.classList.add('message_directed');
    }
    let [date, time] = new Date(msg.createdAt).toLocaleString('ru-RU').split(' ');
    el.innerHTML = `${time} <b>${msg.nickname}</b>: ${msg.text}`;
    messages.appendChild(el);
}

function newUser(user) {
    let el = document.createElement('li');
    el.classList.add('list__user');
    let status = document.createElement('span');
    status.classList.add('user__status', user.status);
    el.appendChild(status);
    let nick = document.createElement('i');
    nick.innerHTML = `${user.userName} | ${user.userNick}`;
    el.appendChild(nick);
    usersList.appendChild(el);
}

sock.on('userLeft', (usr) => {
    let el = document.createElement('li');
    el.classList.add('message', 'message_user-left');
    let formattedTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    el.innerHTML = `${formattedTime} <b>${usr.userNick}</b> left the chat`;
    messages.appendChild(el);

    for (let li of usersList.childNodes){
        if (li.textContent.split(' | ').includes(usr.userNick)) {
            let status = li.firstChild;
            status.classList.remove(ONLINE);
            status.classList.add(OFFLINE);
            break
        }
    }
});

sock.on('updateStatus', (usr) => {
    for (let li of usersList.childNodes){
        if (li.textContent.split(' | ').includes(usr.userNick)) {
            let status = li.firstChild;
            status.classList.remove(APPEARED);
            status.classList.add(ONLINE);
            break
        }
    }
});

function getByClass(cl) {
    return document.getElementsByClassName(cl);
}
function getById(_id) {
    return document.getElementById(_id);
}

function validateName(name) {
    for (let user of usersList.childNodes){
        let nick = user.textContent.split(' | ')[1];
        if (nick === name) {
            alert(`Nickname '${name}' already taken`);
            return false
        }
    }
    return true
}