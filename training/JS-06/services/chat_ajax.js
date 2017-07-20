let userName = getById('form__name');
let userNick = getById('form__nick');
let pageChat = getByClass('b-page__chat')[0];
let loginForm = getByClass('login__form')[0];
let usersList = getByClass('users__list')[0];
let messages = getByClass('messages')[0];
let message = getByClass('send-form__input')[0];
let sendButton = getByClass('send-form__button')[0];
let headerUsername = getByClass('header__username')[0];

let xhr = new XMLHttpRequest();

loginForm.onsubmit = (e) => {
    e.preventDefault();
    if(validateName(userNick.value)) {
        login();
    }
};

sendButton.parentElement.onsubmit = (e) => {
    e.preventDefault();
    if (!message.value) {return}
    fetchMessage();
};
sendButton.onclick = () => {
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
        nickname: userNick.value,
        text: message.value,
        createdAt: new Date(),
    };

    message.value = '';

    ajaxReq({
        method: 'POST',
        url: '/messages',
        data: data,
    });

}

function ajaxReq(options) {
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function () {};
    let data = options.data || {};

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function getData() {
    ajaxReq({
        url: '/chat-data',
        method: 'GET',
        callback: (data) => {
            while (messages.hasChildNodes()) {
                messages.removeChild(messages.firstChild);
            }
            while (usersList.hasChildNodes()) {
                usersList.removeChild(usersList.firstChild);
            }
            let parsed = JSON.parse(data);
            for (let msg of parsed['messages']) {
                let el = document.createElement('li');
                el.classList.add('message');
                if (msg.text.split(' ').includes(`@${userNick.value}`)){
                    el.classList.add('message_directed');
                }
                let formattedDate = new Date(msg.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                el.innerHTML = `${formattedDate} <b>${msg.nickname}</b>: ${msg.text}`;
                messages.appendChild(el);
            }
            for (let user of parsed['users']) {
                let listUser = document.createElement('li');
                listUser.classList.add('list__user');
                let userStatus = document.createElement('span');
                userStatus.classList.add('user__status_online');
                listUser.appendChild(userStatus);
                let nick = document.createElement('i');
                nick.innerHTML = `${user.userName} | ${user.userNick}`;
                listUser.appendChild(nick);
                usersList.appendChild(listUser);
            }
        },
    });
}

setInterval(() => {
    getData();
}, 1000);

window.onbeforeunload = () => {
    beforeLeave();
    if (userName.value) {
        message.value = 'Left the chat';
        fetchMessage();
    }
};

function beforeLeave() {
    ajaxReq({
        url: '/user/del',
        method: 'DELETE',
        data: {nick: userNick.value},
    })
}

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