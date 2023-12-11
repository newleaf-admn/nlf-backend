const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const bookSchema = new mongoose.Schema({
  isFeatured: {
    type: Boolean,
    default: false
  },

  isVisible: {
    type: Boolean,
    default: true
  },

  paperbackPrice: {
    type: Number
  },

  hardbackPrice: {
    type: Number
  },

  numberOfPages: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  publisher: {
    type: String,
    default: 'New Leaf Media, LLC'
  },

  language: {
    type: String,
    required: true
  },

  coverType: {
    type: String,
    required: true
  },

  itemWeight: {
    type: String,
    required: true
  },
  
  dimensions: {
    type: String,
    required: true
  },

  publishedAt: {
    type: Date,
    required: true
  }
},
{ timestamps: { createdAt: true, updatedAt: true } })

bookSchema.plugin(mongoosePaginate)

const Books = mongoose.model('Books', bookSchema)

exports.Books = Books
