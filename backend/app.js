require('./models/database')
require('dotenv').config();
const http = require('http');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
http.createServer(app).listen(process.env.PORT || 3000, () => {
    console.log("\x1b[33m[SERVER]\x1b[0m Connection to server established on port: " + process.env.PORT || 3000);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(require('./controllers/auth'))
app.get('/', (req, res) => res.send('Hello World!'))