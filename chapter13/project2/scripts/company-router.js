
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

/*	Was unsuccessful in using PUT because the tester-form.html's formaction
	didn't seem to allow method="PUT" */
// update an existing company
const updateCompany = (companyProvider, app) => {
	app.post('/modify/update', (req, res) => {
		console.log('called the updateCompany method');
		const companies = companyProvider.getData();
		console.log(req.body);
		// find the company based on the id
		const idToFind = req.body.symbol.toUpperCase();
		 // search the array of objects for a match
		 let indx = companies.findIndex(c => c.symbol == idToFind);
		 if (indx < 0) {
		  res.send (`${idToFind} not found`);
		 }
		 else {
		  companies[indx].name = req.body.company;
		  companies[indx].sector = req.body.sector;
		  companies[indx].sub = req.body.sub;
		  companies[indx].address = req.body.address;
		  companies[indx].exchange = req.body.exchange;
		  res.send (`Company with id=${idToFind} was updated`)
		 }
	});
};

// insert a new company
const insertCompany = (companyProvider, app) => {
	app.post('/modify/insert', (req, res) => {
		console.log('called the insertCompany method');
		const companies = companyProvider.getData();
		console.log(req.body);
		// find the company based on the id
		const idToFind = req.body.symbol.toUpperCase();
		 // search the array of objects for a match
		 let indx = companies.findIndex(c => c.symbol == idToFind);
		 if (indx >= 0) {
		  res.send (`${idToFind} already exists`);
		 }
		 else {
			companies.push({
				symbol: req.body.symbol.toUpperCase(),
				name: req.body.company,
				sector: req.body.sector,
				sub: req.body.sub,
				address: req.body.address,
				exchange: req.body.exchange
			});
			res.send (`Company with id=${req.body.symbol} was inserted`);
		}
	});
};

/*	Was unsuccessful in using DELETE because the tester-form.html's formaction
	didn't seem to allow method="DELETE" */
// delete an existing company
const deleteCompany = (companyProvider, app) => {
	app.post('/modify/delete', (req, res) => {
		console.log('called the deleteCompany method');
		const companies = companyProvider.getData();
		// find the company based on the id
		console.log(req.body);
		const idToFind = req.body.symbol.toUpperCase();
		 // search the array of objects for a match
		 let indx = companies.findIndex(c => c.symbol == idToFind);
		 if (indx < 0) {
			res.send (`${idToFind} not found`);
		 }
		 else {
			companies.splice(indx, 1);
		 }
		 res.send (`Company with id=${req.body.symbol} was deleted`);
	});
};

const jsonMessage = (msg) => {
    return { message: msg };
};
module.exports = {
    handleAll,
    handleSingleSymbol,
	updateCompany,
	insertCompany,
	deleteCompany
};