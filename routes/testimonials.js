const express = require('express')
const router = express.Router()

const { Testimonial } = require('../models/testimonial')
const adminAuth = require('../middleware/admin-auth')

router.post('/', adminAuth, async (req, res) => {
  try {
    const newData = new Testimonial(req.body.testimonial)
    await newData.save()

    res.status(200).send(newData)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/a/all', adminAuth, async (req, res) => {
  try {
    const { searchType, searchValue, page } = req.query
    const options = {
      page: parseInt(page, 10),
      limit: 10,
      sort: { createdAt: -1 }
    }

    let filterQuery = {}

    if (searchType && searchValue) {
      filterQuery = {
        [searchType.toLowerCase()]: { $regex: searchValue, $options: 'i' }
      }
    }

    const testimonials = await Testimonial.paginate(filterQuery, options)
    res.status(200).send(testimonials)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/u/all', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isVisible: true
    })

    res.status(200).send(testimonials)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const found = await Testimonial.findOne({ _id: req.params.id })

    if (!found) return res.status(404).send('Data not found')

    res.status(200).send(found)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.patch('/:id', adminAuth, async(req, res) => {
  try {
    const update = Object.keys(req.body)
    const testimonial = await Testimonial.findById(req.params.id)

    if (!testimonial) {
      return res.status(404).send('Data not found')
    }


    update.forEach(update => testimonial[update] = req.body[update])
    await testimonial.save()

    res.status(200).send(testimonial)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router