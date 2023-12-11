const express = require('express')
const router = express.Router()

const { Announcements } = require('../models/announcement')
const adminAuth = require('../middleware/admin-auth')

router.post('/', async (req, res) => {
  try {
    const newData = new Announcements(req.body.announcement)
    await newData.save()

    res.status(200).send(newData)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/a/all', async (req, res) => {
  try {
    const { page, searchType, searchValue } = req.query
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

    const announcements = await Announcements.paginate(filterQuery, options)
    res.status(200).send(announcements)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/u/all', async (req, res) => {
  try {
    const announcements = await Announcements.find({
      isVisible: true
    })

    res.status(200).send(announcements)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const found = await Announcements.findOne({ _id: req.params.id })

    if (!found) return res.status(404).send('Data not found')

    res.status(200).send(found)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const update = Object.keys(req.body)
    const announcement = await Announcements.findById(req.params.id)

    if (!announcement) {
      return res.status(404).send('Data not found')
    }


    update.forEach(update => announcement[update] = req.body[update])
    await announcement.save()

    res.status(200).send(announcement)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router