
const express = require('express');
const path = require('path');
const app = express();

// tell node to use json and HTTP header features in body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// reference own modules that manage data and routing
const companyProvider = require('../scripts/company-provider.js');
const companyHandler = require('../scripts/company-router.js');

// handle requests
app.use(express.static(__dirname));
companyHandler.handleAll(companyProvider, app);
companyHandler.handleSingleSymbol(companyProvider, app);
companyHandler.updateCompany(companyProvider, app);
companyHandler.insertCompany(companyProvider, app);
companyHandler.deleteCompany(companyProvider, app);
// for anything else, display 404 errors
app.use( (req,resp) => {
    resp.status(404).send('Unable to find the requested resource!');
});

// use port in .env file or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});
