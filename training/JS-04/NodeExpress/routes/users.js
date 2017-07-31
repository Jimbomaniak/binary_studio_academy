const router = require('express').Router();
const userService = require('../services/users');

router.get('/', (req, res) => {
    userService.findAllUsers().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send(err);
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
        res.status(500).send(err);
    });
});

router.post('/create', (req, res) => {
    userService.createUser(req.body.nickname).then(() => {
        res.send(`${req.body.nickname} created`);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.delete('/delete/:id', (req, res) => {
    console.log(`Deleting ${req.params.id}`);
    userService.deleteUser(req.params.id);
    res.send('Maybe deleted...');
});

router.patch('/:id', (req, res) => {
    try {
        userService.updateUser(parseInt(req.params.id), req.body.nickname);
    } catch (err) {
        res.status(500).send(err);
    }
    res.send(`User ${req.params.id} update nickname to '${req.body.nickname}'`)
});

module.exports = router;
