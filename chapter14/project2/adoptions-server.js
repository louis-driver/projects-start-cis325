
const express = require('express');
const app = express();
require('dotenv').config();
console.log(process.env.MONGO_URL);

const mongoose = require('mongoose');

//Create connection with database
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to mongo');
});

//Get adoption data model
const Adoption = require('./models/Adoption.js');

// handle requests
app.use(express.static(__dirname));

//Create route to return adoptions sorted by date, TODO sort
app.get('/api/adoptions', async (req, resp) => {
    const allAdoptions = await Adoption.find({}, "-_id id adoptions.id adoptions.date").sort({"adoptions.date": 1});
    resp.status(200).send({
        status: 'Success',
        data: allAdoptions
    });
});

//Create route to return adoptions for the object whose id matches the passed id
app.get('/api/adoptions/:id', async (req, resp) => {
	const symbolToFind = req.params.id;
    const uniAdoptions = await Adoption.find({id: symbolToFind}, "-_id adoptions id");
    resp.status(200).send({
        status: 'Success',
        data: uniAdoptions
    });
});

//Create route to return adoptions whose University id matches the passed id
app.get('/api/adoptions/university/:id', async (req, resp) => {
	const symbolToFind = req.params.id;
    const uniAdoptions = await Adoption.find({"university.id": symbolToFind}, {"university.id":1, adoptions:1}).exec();
    resp.status(200).send({
        status: 'Success',
        data: uniAdoptions
    });
});

// for anything else, display 404 errors
app.use( (req,resp) => {
    resp.status(404).send('Unable to find the requested resource!');
});

// use port in .env file or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});
