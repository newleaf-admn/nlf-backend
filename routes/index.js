const express = require('express')
const router = express.Router()

router.get('/handShake', async (req, res) => {
  res.send('Hi!')
})

module.exports = router