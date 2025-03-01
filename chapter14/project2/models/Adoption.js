const mongoose = require ('mongoose');
//Define a schema that maps to the structure of the data in MongoDB
const adoptionSchema = new mongoose.Schema({
    id: Number,
    gui: String,
    contacts: [{
        order: Number,
        gender: String,
        firstname: String,
        lastname: String
    }],
    university: {
        id: Number,
        name: String,
        address: String,
        city: String,
        state: String,
        website: String,
        zip: String,
        longitude: Number,
        latitude: Number,
        classification: String

    },
    adoptions: [{
        id: Number,
        date: String,
        quantity: Number,
        books: {
            id: Number,
            isbn10: String,
            isbn13: Number,
            title: String,
            Category: String
        }
    }],
    messages: [{
        id: Number,
        date: String,
        content: String,
        category: String
    }]
});
//Create model using the schema that maps to adoptions collection in database
module.exports = mongoose.model('Adoption', adoptionSchema, 'adoptions');