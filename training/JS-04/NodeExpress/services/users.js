const db = require('./db');
const assert = require('assert');

exports.findAllUsers = () => {
    return db.get().collection('users').find({}, {fields: {_id: 0}}).toArray();
};

exports.findUser = (id) => {
    return db.get().collection('users').findOne(
        {'id': parseInt(id)},
        {fields: {_id: 0}}
    );
};

exports.createUser = (name) => {
    let users = db.get().collection('users');
    return users.findOne({}, {'sort': [['id', 'desc']]})
        .then((user) => user.id)
        .then((lastId) => {
            users.insertOne({id: lastId + 1, nickname: name}, (err, r) => {
                try {
                    assert.equal(null, err);
                    assert.equal(1, r.insertedCount)
                } catch (err) {
                    console.log(err);
                    console.log(r);
                }
            })
        })
        .catch((err) => console.log(err));
};

exports.deleteUser = (id) => {
    return db.get().collection('users').deleteOne({'id': parseInt(id)});
};

exports.updateUser = (id, name) => {
    return db.get().collection('users').findOneAndUpdate(
        {'id': id},
        {'$set': {nickname: name}},
        {returnOriginal: false})
        .then((r) => r)
        .catch((err) => err);
};
