
// first reference required modules
const fs = require('fs');
const path = require('path');

// for now, read a json file from the static folder
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