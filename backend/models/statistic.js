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
        _id: false
    },
    priorityTwo: {
        type: statisticSchemaDefault,
        _id: false
    },
    priorityThree: {
        type: statisticSchemaDefault,
        _id: false
    }
})

const persistStatistic = new mongoose.Schema({
    created: {
        type: Number,
        _id: false
    },
    finished: {
        type: Number,
        _id: false
    },
    canceled: {
        type: Number,
        _id: false
    }
})

const Statistic = mongoose.model('Statistic', statisticSchema)
module.exports = { Statistic, statisticSchema, persistStatistic }