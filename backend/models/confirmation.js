const mongoose = require('mongoose')

const { Schema } = mongoose

const confirmationSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

const ConfirmationUser = mongoose.model('Confirmation', confirmationSchema)

module.exports = { ConfirmationUser }