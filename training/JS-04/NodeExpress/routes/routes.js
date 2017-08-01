const user = require('./users');

module.exports = (app) => {
    app.use('/api/users', user);
};
