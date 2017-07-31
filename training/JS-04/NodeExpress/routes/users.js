const router = require('express').Router();
const userService = require('../services/users');

router.get('/', (req, res) => {
    userService.findAllUsers().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/:id', (req, res) => {
    userService.findUser(req.params.id).then((founded) => {
        if(founded) {
            res.send(founded);
        } else {
            res.status(404).send({"Not found": req.params.id});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Something went wrong... See the console.log');
    });
});

router.post('/create', (req, res) => {
    userService.createUser(req.body).then((err, ok) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(ok);
        }
    }).catch((err) => {
        res.status(400).send(err);
    });
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
