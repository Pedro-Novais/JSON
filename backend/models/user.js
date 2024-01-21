const mongoose = require('mongoose')

const { Schema } = mongoose

const { taskSchema } = require('./tasks')
const { configSchema } = require('./config')
const { statisticSchema } = require('./statistic')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tasks: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Task'
    },
    configurations: {
        type: configSchema, 
        required: true,
        _id: false
    },
    statistic: {
        type: statisticSchema,
        required: true,
        _id: false
    }
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User };