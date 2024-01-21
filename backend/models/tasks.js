const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task, taskSchema }