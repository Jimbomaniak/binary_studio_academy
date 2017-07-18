let userName = document.getElementById('form__name');
let userNick = document.getElementById('form__nick');
let pageChat = document.getElementsByClassName('b-page__chat')[0];
let loginForm = document.getElementsByClassName('login__form')[0];
let usersList = document.getElementsByClassName('users__list')[0];
let messages = document.getElementsByClassName('messages')[0];
let message = document.getElementsByClassName('send-form__input')[0];
let sendMessage = document.getElementsByClassName('send-form__button')[0];
let headerUsername = document.getElementsByClassName('header__username')[0];

let date = new Date;

loginForm.onsubmit = (e) => {
    e.preventDefault();
    login();
};
sendMessage.parentElement.onsubmit = (e) => {
    e.preventDefault();
    if (!message.value) {return}
    fetchMessage();
};
sendMessage.onclick = () => {
    if (!message.value) {return}
    fetchMessage();
};

function login() {
    let data = {
        userName: userName.value,
        userNick: userNick.value,
    };
    ajaxReq({
        method: 'POST',
        url: '/users',
        data: data,
    });
    headerUsername.innerHTML = data.userName;
    pageChat.style.animation = 'fadeIn 1s ease-in';
    pageChat.style.display = 'block';
    loginForm.style.display = 'none';
}

function fetchMessage() {
    let data = {
        name: userNick.value,
        text: message.value,
        createdAt: date.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    };

    message.value = '';

    ajaxReq({
        method: 'POST',
        url: '/messages',
        data: data,
    });

}

let ajaxReq = (options) => {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function () {};
    let data = options.data || {};

    let xhr = new XMLHttpRequest;
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
            callback(xhr.responseText);
        }
    };
};

function getData() {
    ajaxReq({
        url: '/messages',
        method: 'GET',
        callback: (msg) => {
            while (messages.hasChildNodes()) {
                messages.removeChild(messages.firstChild);
            }
            let msgs = JSON.parse(msg);
            for (let msg of msgs) {
                let el = document.createElement('li');
                el.classList.add('message');
                el.innerHTML = `${msg.createdAt} ${msg.name}: ${msg.text}`;
                messages.appendChild(el);
            }
        },
    });
};

function getUsers() {
    ajaxReq({
        url: '/users',
        method: 'GET',
        callback: (users) => {
            while (usersList.hasChildNodes()) {
                usersList.removeChild(usersList.firstChild);
            }
            let parsedUsers = JSON.parse(users);
            for (let user of parsedUsers) {
                let listUser = document.createElement('li');
                listUser.classList.add('list__user');
                let userStatus = document.createElement('span');
                userStatus.classList.add('user__status');
                listUser.appendChild(userStatus);
                let nick = document.createElement('i');
                nick.innerHTML = `${user.userName} | ${user.userNick}`;
                listUser.appendChild(nick);
                usersList.appendChild(listUser);
            }
        }
    })
}
setInterval(() => {
    getUsers();
    getData();
}, 1000);


window.onbeforeunload = () => {
    if (userName.value) {
        message.value = 'Left the chat';
        fetchMessage();
    }
};