const mongoose = require('mongoose')

const { Schema } = mongoose

const rankingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    position:{
        type: Number,
        required: true,
        unique: true
    },
    nameUser:{
        type: String,
        required: true
    },
    tasksCreated:{
        type: Number,
        required: true
    },
    tasksFinished:{
        type: Number,
        required: true
    },
    tasksCanceled:{
        type: Number,
        required: true
    }
})

const Ranking = mongoose.model('Ranking', rankingSchema)

module.exports = { Ranking }