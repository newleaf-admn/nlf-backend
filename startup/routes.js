const index = require('../routes/index')
const admins = require('../routes/admins')
const books = require('../routes/books')
const messages = require('../routes/messages')
const registrants = require('../routes/registrants')
const testimonials = require('../routes/testimonials')
const announcements = require('../routes/announcements')
const memories = require('../routes/memories')

module.exports = function(app) {
  app.use('/api/index', index)
  app.use('/api/admins', admins)
  app.use('/api/books', books)
  app.use('/api/messages', messages)
  app.use('/api/registrants', registrants)
  app.use('/api/testimonials', testimonials)
  app.use('/api/announcements', announcements)
  app.use('/api/memories', memories)
}