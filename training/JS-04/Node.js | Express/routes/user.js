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
        if(founded) {
            res.send(founded);
        } else {
            res.send({"Not found": req.params.id})
        }
    }).catch((err) => {
        console.log(err);
        res.send('Something went wrong... See the console.log');
    });
});

router.post('/create', (req, res) => {
    userService.createUser(req.body);
    res.send('Maybe created...');
});

router.delete('/delete/:id', (req, res) => {
    console.log(`Deleting ${req.params.id}`);
    userService.deleteUser(req.params.id);
    res.send('Maybe deleted...');
});

router.patch('/:id', (req, res) => {
    userService.updateUser(parseInt(req.params.id), req.body);
    res.send('Maybe updated...');
});

module.exports = router;


// "_id": {
//     "$oid": "596b399cbc796484b017a85d"
// },
// "id": 10,
//     "nickname": "lbeccera9",
//     "email": "nspringall9@xing.com",
//     "password": "EjOsRX"