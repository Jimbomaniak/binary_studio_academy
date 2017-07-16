const router = require('express').Router();
const userService = require('../services/user');

router.get('/', (req, res) => {
    let users = userService.findAllUsers();
    users.then((allUsers) => {
        res.send(allUsers);
    }).catch((err) => {
        console.log(err);
        res.send('Something went wrong... See the console.log');
    })
});

router.get('/:id', (req, res) => {
    let user = userService.findUser(req.params.id);
    user.then((founded) => {
        res.send(founded);
    }).catch((err) => {
        console.log(err);
        res.send('Something went wrong... See the console.log');
    });
});

router.post('/create', (req, res) => {
    console.log('Creating...');
    console.log(req.body);
    userService.createUser(req.body);
    res.send('Maybe created...');
});

router.delete('/delete/:id', (req, res) => {
    console.log(`Deleting ${req.params.id}`);
    userService.deleteUser(req.params.id);
    res.send('Maybe deleted...');
});

module.exports = router;


// "_id": {
//     "$oid": "596b399cbc796484b017a85d"
// },
// "id": 10,
//     "nickname": "lbeccera9",
//     "email": "nspringall9@xing.com",
//     "password": "EjOsRX"