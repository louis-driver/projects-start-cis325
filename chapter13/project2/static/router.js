const express = require('express');
const path = require('path');

/*
const router = express.Router();
router.get('/', (req, resp) => {
    resp.send
})
*/

// return all companies
const handleAll = (companyProvider, app) => {
    app.get('/', (req,resp) => {
	// get data from company provider
	const companies = companyProvider.getData();
	resp.json(companies);
    } );
}
// return just the requested company
const handleSingleSymbol = (companyProvider, app) => {
    app.get('/:id', (req,resp) => {
	const companies = companyProvider.getData();
	const symbolToFind = req.params.id.toUpperCase();
	const stock = companies.filter(obj => symbolToFind === obj.symbol);
	if (stock.length > 0) {
	    resp.json(stock);
	} else {
	    resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
	}
    });
};
// update an existing company

// insert a new company


// delete an existing company


const jsonMessage = (msg) => {
    return { message: msg };
};

export default router;
module.exports = {
    handleAll,
    handleSingleSymbol
};