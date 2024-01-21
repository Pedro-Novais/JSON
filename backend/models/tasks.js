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
    }
},{ 
    versionKey: false 
}
)

const Task = mongoose.model('Task', taskSchema)

module.exports = { Task, taskSchema }