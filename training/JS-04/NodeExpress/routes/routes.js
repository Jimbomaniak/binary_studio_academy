const user = require('./users');

module.exports = (app) => {
    app.use('/users', user);
};
