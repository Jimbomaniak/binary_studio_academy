const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const routes = require('./routes/routes')(app);

db.connect().then((err) => {
    if (err) {
        console.log('No connection to database');
    } else {
        app.listen(4321, () => {
            console.log('Messapp on port: 4321');
        })
    }
});
