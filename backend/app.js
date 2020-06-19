require('./models/database')
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.listen(process.env.PORT || 3000, () => {
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
app.use(require('./controllers/albums'))
app.use(require('./controllers/fav'))
app.get('/', (req, res) => res.send('Hello World!'))

// SOAP
const soap = require('soap');
const url = 'http://localhost:3030/bmicalculator?wsdl';
const args = { weight: 65.7, height: 1.63 };
soap.createClient(url, function(err, client) {
  if (err) console.error(err);
  else {
    client.calculateBMI(args, function(err, response) {
      if (err) console.error(err);
      else {
        console.log(response);
      }
    });
  }
});