const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const registrantSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },

  fullName: {
    type: String,
    required: true
  },

  contactNum: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  }
},
{
  timestamps: { createdAt: true, updatedAt: true }
})

registrantSchema.plugin(mongoosePaginate)

const Registrants = mongoose.model('Registrants', registrantSchema)

exports.Registrants = Registrants