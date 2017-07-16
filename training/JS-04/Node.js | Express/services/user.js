const db = require('./db');

class User{
    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

function findAllUsers() {
    let users = db.get().collection('users');
    return users.find({}).toArray();
}

function findUser(id) {
    let users = db.get().collection('users');
    return users.find({'id': parseInt(id)}).toArray();
}

function createUser(name, email="JC@heaven.net", password="imnotexist") {
    let users = db.get().collection('users');
    users.insert({id: 0, name: name, email: email, password: password}).then();
}

function deleteUser(id) {
    let users = db.get().collection('users');
    users.deleteOne({'id': parseInt(id)}).then();
}

module.exports = {
    User: User,
    findUser: findUser,
    findAllUsers: findAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,

};