let mongoose = require('mongoose');

let state = {
    db: null
};

// let messageSchema = mongoose.Schema({
//     name: String,
//     text: String,
//     createdAt: String,
// });

// let MessageModel = mongoose.Model('Message', messageSchema);


exports.connect = (url, done) => {
    if (state.db){
        return done;
    }
    mongoose.createConnection(url, (err, db) => {
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

// exports.writeMessage = (data) => {
//     let msg = new MessageModel({
//         name: data.name,
//         text: data.text,
//         createdAt: data.createdAt,
//     });
//     msg.save((err, msg) => {
//         if (err) {console.log(err)}
//     });
// };

exports.my_db = ('mongodb://skyrocker:js-06@ds161012.mlab.com:61012/js06');
