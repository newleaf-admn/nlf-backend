const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const memorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    images: {
        type: Array
    }
},
{
    timestamps: { createdAt: true, updatedAt: true }
})

memorySchema.plugin(mongoosePaginate)

const Memories = mongoose.model('Memories', memorySchema)

exports.Memories = Memories

