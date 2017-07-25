const client = require('mongodb').MongoClient;
const dbURL = 'mongodb://skyrocker:test123@ds159892.mlab.com:59892/bsa-js';

let connect = () => {
    console.log('YIELD CONNECT');
    let db = yield client.connect(dbURL);
    db.close();
    console.log('CLOSED');
};

let get = (col) => {
    console.log(`Getting: ${col}`);
    let db = client.connect(dbURL);
    let result = db.collection(col).find().toArray();
    db.close();
    console.log('"Get" ends');
    return result
};

let insert = (data, col) => {
    console.log(`Inserting: ${data}`);
    let db = client.connect(dbURL);
    let result = db.collection(col).insertOne(data);
    db.close();
    console.log('Inserting finish');
    return result
};

module.exports = {
    connect: connect,
    get: get,
    insert: insert,
};



// exports.my_db = dbURL;
//
// let state = {
//     db: null
// };
//
// exports.connect = (url, done) => {
//     if (state.db){
//         return done;
//     }
//     client.connect(url, (err, db) => {
//         if (err) {
//             return done(err);
//         }
//         state.db = db;
//         done();
//     })
// };
//
// exports.get = () => {
//     return state.db;
// };
//
// exports.close = (done) => {
//     if (state.db) {
//         state.db.close((err) => {
//             state.db = null;
//             state.mode = null;
//             done(err);
//         })
//     }
// };
