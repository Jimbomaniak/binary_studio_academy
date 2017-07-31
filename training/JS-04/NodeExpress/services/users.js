const db = require('./db');
const assert = require('assert');

exports.findAllUsers = () => {
    return db.get().collection('users').find().toArray();
};

exports.findUser = (user_id) => {
    return db.get().collection('users').findOne({'user_id': parseInt(user_id)});
};

exports.createUser = (name) => {
    let users = db.get().collection('users');
    return users.findOne({}, {'sort': [['user_id', 'desc']]})
        .then((user) => user.user_id)
        .then((lastId) => {
            users.insertOne({user_id: lastId + 1, nickname: name}, (err, r) => {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount)
            })
        })
        .catch((err) => console.log(err));
};

exports.deleteUser = (user_id) => {
    return db.get().collection('users')
        .deleteOne({
            'user_id': parseInt(user_id)
        });
};

exports.updateUser = (user_id, name) => {
    let users = db.get().collection('users');
    users.findOneAndUpdate(
        {'user_id': user_id},
        {'$set': {nickname: name}},
        {returnOriginal: false},
        (err, r) => {
            assert.equal(null, err);
            assert.equal(name, r.value.nickname);
    });
};
