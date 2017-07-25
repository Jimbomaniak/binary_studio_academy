const mongo = require('mongodb').MongoClient;
const my_db = 'mongodb://skyrocker:test123@ds159892.mlab.com:59892/bsa-js';
exports.my_db = my_db;

let state = {
    db: null
};

exports.connect = (url, done) => {
    if (state.db){
        return done;
    }
    mongo.connect(url, (err, db) => {
        if (err) {
            return done(err);
        }
        state.db = db;
        done();
    })
};

exports.get = () => {
    return state.db;
};

exports.close = (done) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            done(err);
        })
    }
};
