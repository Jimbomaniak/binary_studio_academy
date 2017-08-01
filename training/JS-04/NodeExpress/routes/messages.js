const router = require('express').Router();
const messageService = require('../services/messages');

router.get('/', (req, res) => {
    messageService.findAllMessages().then((messages) => {
        res.send(messages);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/from/:id', (req, res) =>{
    let id = req.params.id;
    messageService.findMessageFromId(id).then((founded) => {
        if(founded) {
            res.send(founded);
        } else {
            res.status(404).send({"Not found": id});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.get('/text/:word', (req, res) => {
    let word = req.params.word;
    messageService.findMessageByWord(word).then((founded) => {
        if(founded) {
            res.send(founded);
        } else {
            res.status(404).send({"Not found": word});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.post('/create', (req, res) => {
    let {senderId, receiverId, text} = req.body;
    messageService.createMessage(senderId, receiverId, text).then(() => {
        res.send(`Message from ${senderId} to ${receiverId} created`);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    messageService.deleteMessage(id).then((r) => {
        if (r.deletedCount) {
            res.send(`Message ${id} deleted`)
        } else {
            res.status(404).send(`Message ${id} not found`)
        }
    }).catch((err) => {
        res.status(500).send(err)
    });
});

router.patch('/:id', (req, res) => {
    let [id, text] = [req.params.id, req.body.text];
    messageService.updateMessage(id, text).then((r) => {
        if (r.value.text === text){
            res.send(`Update message ${id} text to '${text}'`)
        }
    }).catch((err) => {
        res.status(404).send(`Message ${id} not found`);
    });
});

module.exports = router;