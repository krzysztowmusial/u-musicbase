const soap = require('soap');
const express = require('express');
const app = express();

const service = {
  BMI_Service: {
    BMI_Port: {
      calculateBMI(args) {
        const n = args.weight / (args.height * args.height);
        return { bmi: n };
      }
    }
  }
};

const xml = require('fs').readFileSync('bmicalculator.wsdl', 'utf8');


app.listen(process.env.PORT || 3030, () => {
    console.log("\x1b[35m[SOAP]\x1b[0m Connection to soap established on port: 3030");
    soap.listen(app, '/bmicalculator', service, xml);
});

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