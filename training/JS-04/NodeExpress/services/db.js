const client = require('mongodb');
const assert = require('assert');
const myDb = 'mongodb://skyrocker:test123@ds159892.mlab.com:59892/bsa-js';

let db = null;

let connect = () => {
    return client.connect(myDb).then((res) => {
        db = res
    });
};

let get = () => {
    return db
};

let close = () => {
    connect.close((err) => {
        if (err) {
            console.log(err);
        }
    })
};

module.exports = {connect, get, close};
