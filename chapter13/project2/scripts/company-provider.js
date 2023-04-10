console.log("file start");
// first reference required modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
//const __dirname = "/Users/louis/OneDrive/Desktop/Programming/CIS325-projects-start/projects-start-cis325/chapter13/project2/"
// for now, we will read a json file from public folder
const jsonPath = path.join(__dirname, '../static/companies-data.json');
// get data using conventional Node callback approach
let companies;
getCompanyData(jsonPath);
async function getCompanyData (jsonPath) {
    try {
        await fs.readFile(jsonPath, "utf-8", (err, data) => {
            if (err) throw err;
            companies = JSON.parse(data);
            console.log("Company data read");
            //console.log(companies);
        });
    }
    catch (err) {
        console.log("Error reading " + jsonPath);
    }
}

function getData() {
    return companies;
}

module.exports = {getData};

// return all the companies when a root request arrives
app.get('/', (req,resp) => { resp.json(companies) } );
// Use express to listen to port
let port = 7000;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});