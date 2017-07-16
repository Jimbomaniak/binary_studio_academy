const db = require('../db');

function findUser(id) {
    let users = db.get().collection('users');
    console.log(users.find());
}

module.exports = {
    findUser: findUser
};