const user = require('./users');
const messages = require('./messages');

module.exports = (app) => {
    app.use('/api/users', user);
    app.use('/api/messages', messages);
};
