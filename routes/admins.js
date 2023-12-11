const express = require('express')
const router = express.Router()

const { Admin } = require('../models/admin')
const adminAuth = require('../middleware/admin-auth')

router.post('/', async (req, res) => {
  try {
    const exist = await Admin.findOne({ username: req.body.admin.username })

    if (exist) {
      return res.status(400).send('Username already exist!')
    }

    const newAdmin = new Admin(req.body.admin)
    await newAdmin.save()

    res.status(200).send(newAdmin)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(req.body.username, req.body.password)
    const token = admin.generateAuthToken()
    
    res.status(200).send({ admin, token })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/me', adminAuth, async (req, res) => {
  try {
    const user = await Admin.findOne({ _id: req.admin._id })

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find()
    return admins
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router