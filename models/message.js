const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const messagesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  conversations: [{
    isAdmin: {
      type: Boolean
    },
    message: {
      type: String
    },
    createdAt: { 
      type: Date
    }
  }]
},
{
  timestamps: { createdAt: true, updatedAt: true }
})

messagesSchema.plugin(mongoosePaginate)

const Messages = mongoose.model('Messages', messagesSchema)

exports.Messages = Messages

