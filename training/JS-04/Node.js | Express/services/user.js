const db = require('../db');

class User{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

function findUser(id) {
    let users = db.get().collection('users');
    return users.find({'id': parseInt(id)}).toArray();
}

module.exports = {
    User: User,
    findUser: findUser
};