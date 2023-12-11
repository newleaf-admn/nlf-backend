const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const testimonialSchema = new mongoose.Schema({
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

  content: {
    type: String
  },

  imageUrl: {
    type: String
  },

  videoUrl: {
    type: String
  }
},
{
  timestamps: { createdAt: true, updatedAt: true }
})

testimonialSchema.plugin(mongoosePaginate)

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

exports.Testimonial = Testimonial