const express = require('express')
const router = express.Router()

const { Memories } = require('../models/memory')

router.post('/', async (req, res) => {
    try {
        const memory = new Memories({
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            images: req.body.images
        })

        await memory.save()

        res.status(200).send(memory)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/test', async (req, res) => {
    res.send('Hi!')
  })

router.get('/', async (req, res) => {
    try {
        const memories = await Memories.find()

        res.status(200).send(memories)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:memoryId', async (req, res) => {
    try {
        const memory = await Memories.findById(req.params.memoryId)

        if (!memory) return res.status(404).send('Memory not found!')

        res.status(200).send(memory)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:memoryId', async (req, res) => {
    try {
        const update = Object.keys(req.body)
        const memory = await Memories.findById(req.params.memoryId)

        if (!memory) return res.status(404).send('Data not found')

        update.forEach(update => memory[update] = req.body[update])
        await memory.save()

        res.status(200).send(memory)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router