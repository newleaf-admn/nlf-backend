const express = require('express')
const router = express.Router()

const { Messages } = require('../models/message')
const adminAuth = require('../middleware/admin-auth')

router.post('/', async (req, res) => {
  try {
    const found = await Messages.findOne({ email: req.body.email })

    if (found) return res.status(200).send(found)
    const newMessage = new Messages({ email: req.body.email })

    await newMessage.save()
    res.status(200).send(newMessage)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/a/all', adminAuth, async (req, res) => {
  try {
    const messages = await Messages.find().sort({ updatedAt: -1 })

    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/conversation/:email', async (req, res) => {
  try {
    const conversation = await Messages.findOne({ email: req.params.email })

    if (!conversation) return res.status(404).send('Conversation does not exist')

    res.status(200).send(conversation)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.patch('/send-message/:email', async (req, res) => {
  try {
    let message = await Messages.findOneAndUpdate({ email: req.params.email },
      {
        $push: { conversations: { isAdmin: false, message: req.body.message, createdAt: new Date()  } }
      },
      { new: true }
    )

    res.status(200).send(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.patch('/a/send-message/:id', adminAuth, async (req, res) => {
  try {
    let message = await Messages.findOneAndUpdate({ _id: req.params.id },
      {
        $push: { conversations: { isAdmin: true, message: req.body.message, createdAt: new Date()  } }
      },
      { new: true }
    )

    res.status(200).send(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router