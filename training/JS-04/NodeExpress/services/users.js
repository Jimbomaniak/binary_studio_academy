const db = require('./db');

exports.findAllUsers = () => {
    return db.get().collection('users').find().toArray();
};

exports.findUser = (user_id) => {
    return db.get().collection('users').findOne({'user_id': parseInt(user_id)});
};

exports.createUser = (name) => {
    let users = db.get().collection('users');
    let lastId = users.findOne({}, {'sort': [['user_id', 'desc']]});
    lastId.then((user) => {
        return users.insertOne({user_id: user.user_id+1, name: name.name}, (err, success) => {
            if (err){
                console.log(err);
                return new Error('Can not insert');
            } else {
                console.log(success);
                return success;
            }
        });
    });
};

exports.deleteUser = (user_id) => {
    return db.get().collection('users')
        .deleteOne({
            'user_id': parseInt(user_id)
        });
};

exports.updateUser = (user_id, data) => {
    let users = db.get().collection('users');
    let user = users.findOne({'user_id': user_id});
    return users.updateOne(user, {'$set': data}, (err, res) => {
        console.log(res.result);
        console.log(user);
    });
};