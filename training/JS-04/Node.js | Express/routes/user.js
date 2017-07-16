const router = require('express').Router();
const userService = require('../services/user');

router.get('/', (req, res) => {
    let user = userService.findUser();
    res.send(user);
});

module.exports = router;