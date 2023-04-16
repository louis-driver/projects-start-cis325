const mongoose = require ('mongoose');
//Define a schema that maps to the structure of the data in MongoDB
const adoptionSchema = new mongoose.Schema({
    id: Number,
    date: Date,
    quantity: Number,
    books: {
        id: Number,
        isbn10: String,
        isbn13: Number,
        title: String,
        Category: String
    }
});
//Create model using the schema that maps to adoptions collection in database
module.exports = mongoose.model('Adoption', adoptionSchema, 'adoptions');