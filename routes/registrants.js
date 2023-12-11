const express = require('express')
const router = express.Router()

const { Registrants } = require('../models/registrant')

router.post('/', async (req, res) => {
  try {
    const newRegistrant = new Registrants(req.body.registrant)
    await newRegistrant.save()

    res.status(200).send('Success Create')
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const { page } = req.query

    const options = {
      page: parseInt(page, 10),
      limit: 12,
      sort: { createdAt: -1 }
    }

    const registrants = await Registrants.paginate({}, options)

    res.status(200).send(registrants)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router