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

function findUser(user_id) {
    let users = db.get().collection('users');
    return users.find({'user_id': parseInt(user_id)}).toArray();
}

function createUser(name) {
    let users = db.get().collection('users');
    users.findOne({}, {'sort': [['user_id', 'desc']]}).then((user) => {
        users.insert({user_id: user.user_id+1, name: name});
    });
}

function deleteUser(user_id) {
    let users = db.get().collection('users');
    users.deleteOne({'user_id': parseInt(user_id)}).then();
}

function updateUser(user_id) {
    let user = db.get().collection('users').find({'user_id': user_id});
    console.log(user);
}

module.exports = {
    User: User,
    findUser: findUser,
    findAllUsers: findAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};