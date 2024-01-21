const mongoose = require('mongoose')

const { Schema } = mongoose

const statisticSchemaDefault = new mongoose.Schema({
    created: {
        type: Number,
        required: true
    },
    finished: {
        type: Number,
        required: true
    },
    canceled: {
        type: Number,
        required: true
    }
})

const statisticSchema = new mongoose.Schema({
    priorityOne: {
        type: statisticSchemaDefault,
        required: true,
        _id: false
    },
    priorityTwo: {
        type: statisticSchemaDefault,
        required: true,
        _id: false
    },
    priorityThree: {
        type: statisticSchemaDefault,
        required: true,
        _id: false
    }
})

const Statistic = mongoose.model('Statistic', statisticSchema)
module.exports = { Statistic, statisticSchema }