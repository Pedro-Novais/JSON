const mongoose = require('mongoose')

const { Schema } = mongoose

const { taskSchema } = require('./tasks')
const { configSchema } = require('./config')

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
       type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Configuration'
    }
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User };