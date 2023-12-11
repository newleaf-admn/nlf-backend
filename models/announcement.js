const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const announcementSchema = new mongoose.Schema({
  isVisible: {
    type: Boolean,
    default: true
  },

  type: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  subtitle: {
    type: String
  },

  imageUrl: {
    type: String
  },

  videoUrl: {
    type: String
  },

  content: {
    type: String
  }
},
{
  timestamps: { createdAt: true, updatedAt: true }
})

announcementSchema.plugin(mongoosePaginate)

const Announcements = mongoose.model('Announcements', announcementSchema)

exports.Announcements = Announcements