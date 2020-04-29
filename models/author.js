const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "can't be blank"], max: 20 },
    lastName: { type: String, required: [true, "can't be blank"], max: 20 },
    dob: { type: Date },
    image: { type: String },
    books: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
})

authorSchema.methods.getFullName = function getFullName() {
    return this.firstName + " " + this.lastName
}

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel