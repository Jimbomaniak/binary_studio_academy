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
    return db.get().collection('users')
        .find({})
        .toArray();
}

function findUser(user_id) {
    return db.get().collection('users')
        .findOne({
            'user_id': parseInt(user_id)
        });
}

function createUser(name) {
    let users = db.get().collection('users');
    users.findOne({}, {'sort': [['user_id', 'desc']]}).then((user) => {
        return users.insertOne({user_id: user.user_id+1, name: name});
    });
}

function deleteUser(user_id) {
    return db.get().collection('users')
        .deleteOne({
            'user_id': parseInt(user_id)
        });
}

function updateUser(user_id, data) {
    let users = db.get().collection('users');
    let user = users.findOne({'user_id': user_id});
    return users.updateOne(user, {'$set': data}, (err, res) => {
        console.log(res.result);
        console.log(user);
    });
}

module.exports = {
    User: User,
    findUser: findUser,
    findAllUsers: findAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};