const router = require('express').Router();
const userService = require('../services/user');

router.get('/', (req, res) => {
    let user = userService.findUser(10);
    user.then((founded) => {
        console.log(founded);
        res.send(founded);
    }).catch((err) => {
        console.log(err);
        res.status(404).send('Not Found');
    });
});

module.exports = router;


// "_id": {
//     "$oid": "596b399cbc796484b017a85d"
// },
// "id": 10,
//     "nickname": "lbeccera9",
//     "email": "nspringall9@xing.com",
//     "password": "EjOsRX"