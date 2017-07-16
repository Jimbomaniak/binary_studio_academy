const db = require('../db');

function findUser(id) {
    let users = db.get().collection('users');
    return users.find({'id': id}).toArray();
}

module.exports = {
    findUser: findUser
};