const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const { Schema } = mongoose

const { taskSchema } = require('./tasks')
const { configSchema } = require('./config')
const { statisticSchema, persistStatistic } = require('./statistic')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    description: {
        type: String,
        required: true
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
    },
    persistStatistic: {
        type: persistStatistic,
        required: true,
        _id: false
    }
},
    { timestamps: true }
)

// Método para verificar a senha
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User', userSchema)

module.exports = { User };