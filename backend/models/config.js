const mongoose = require('mongoose')

const { Schema } = mongoose

const configSchema = new Schema({
    orderPriority: {
        type: Boolean
    },
    usersCanViewStatistic: {
        type: Boolean
    }
})

const Config = mongoose.model('Configuration', configSchema)

module.exports = { Config, configSchema }