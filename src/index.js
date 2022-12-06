const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});

app.get('/publications', async (req, res) => {
    res.sendFile(path.join(__dirname + '../../publications.html'));
});

require('./controllers/index')(app);

app.listen(3000);