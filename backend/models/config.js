const mongoose = require('mongoose')

const { Schema } = mongoose

const configSchema = new Schema({
    orderPriority: {
        type: Boolean,
        required: true
    },
    usersCanViewStatistic: {
        type: Boolean,
        required: true
    }
})

const Config = mongoose.model('Configuration', configSchema)

module.exports = { Config, configSchema }