const db = require('./db');
const assert = require('assert');

exports.findAllMessages = () => {
    return db.get().collection('messages').find({}, {fields: {_id: 0}}).toArray();
};

exports.findMessageFromId = (id) => {
    return db.get().collection('messages').find(
        {'senderId': parseInt(id)},
        {fields: {_id: 0}}
    ).toArray();
};

exports.findMessageByWord = (word) => {
    return db.get().collection('messages').find(
        {'text': {$regex: `.*${word}.*`}},
        {fields: {_id: 0}}
    ).toArray();
};

exports.createMessage = (sender, receiver, text) => {
    let messages = db.get().collection('messages');
    return messages.findOne({}, {'sort': [['id', 'desc']]})
        .then((message) => message.id)
        .then((lastId) => {
            messages.insertOne({
                id: lastId + 1,
                senderId: sender,
                receiverId: receiver,
                text: text
            }, (err, r) => {
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

exports.deleteMessage = (id) => {
    return db.get().collection('messages').deleteOne({'id': parseInt(id)});
};

exports.updateMessage = (id, text) => {
    return db.get().collection('messages').findOneAndUpdate(
        {'id': parseInt(id)},
        {'$set': {text: text}},
        {returnOriginal: false})
        .then((r) => r)
        .catch((err) => err);
};