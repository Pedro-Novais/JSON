const mongoose = require('mongoose')

const { Schema } = mongoose

const midiaInfoSchema = new Schema({

    nameSocialMidia: {
        type: String,
    },
    urlSocialMidia: {
        type: String,
    },
    state: {
        type: Boolean,
    }
}, {
    required: true,
    _id: false
})

const midiaSchema = new Schema({
    instagram: {
        type: midiaInfoSchema,
    },
    facebook: {
        type: midiaInfoSchema,
    },
    linkedin: {
        type: midiaInfoSchema,
    },
    twitter: {
        type: midiaInfoSchema,
    }
}, {
    required: false,
    _id: false
}
)

const Midia = mongoose.model('Midia', midiaSchema)

module.exports = { Midia, midiaSchema }