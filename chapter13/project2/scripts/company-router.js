
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

const modify = (companyProvider, app) => {
	app.get('/modify', (req, res) => {
		console.log('called the modify method');
	});
};
// update an existing company
const updateCompany = (companyProvider, app) => {
	app.post('/modify/update', (req, res) => {
		console.log('called the updateCompany method');
		const companies = companyProvider.getData();
		// find the photo based on the id
		console.log(req.body);
		const idToFind = req.body.symbol;
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


// delete an existing company


const jsonMessage = (msg) => {
    return { message: msg };
};
module.exports = {
    handleAll,
    handleSingleSymbol,
	updateCompany,
	modify
};