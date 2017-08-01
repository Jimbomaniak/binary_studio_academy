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
    let id = req.params.id;
    userService.deleteUser(id).then((r) => {
        if (r.deletedCount) {
            res.send(`User ${id} deleted`)
        } else {
            res.status(404).send(`User ${id} not found`)
        }
    }).catch((err) => {
        res.status(500).send(err)
    });
});

router.patch('/:id', (req, res) => {
    let [id, name] = [req.params.id, req.body.nickname];
    userService.updateUser(parseInt(id), name).then((r) => {
        if (r.value.nickname === name){
            res.send(`User ${id} update nickname to '${name}'`)
        }
    }).catch((err) => {
        res.status(404).send(`User ${id} not found`);
    });
});

module.exports = router;
