const express = require('express')
const router = express.Router()

const { Books } = require('../models/book')
const adminAuth = require('../middleware/admin-auth')

router.post('/', async (req, res) => {
  try {
    const exist = await Books.findOne({ title: req.body.book.title })
    if (exist) return res.status(400).send('Book already exist!')

    if (req.body.book.paperbackPrice) {
      if (req.body.book.paperbackPrice <= 0) {
        return res.status(400).send('Invalid price')
      }
    }

    if (req.body.book.hardbackPrice) {
      if (req.body.book.hardbackPrice <= 0) {
        return res.status(400).send('Invalid price')
      }
    }

    if (req.body.book.coverType === 'Paperback and Hardback') {
      if (!req.body.book.paperbackPrice || !req.body.book.hardbackPrice) {
        return res.status(400).send('Paperback Price or Hardback Price should not be empty')
      }
    }
    
    const newBook = new Books(req.body.book)
    await newBook.save()

    res.status(200).send(newBook)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const found = await Books.findById(req.params.id)

    if (!found) return res.status(404).send('Book not found.')

    res.status(200).send(found)
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
    
    const books = await Books.paginate(filterQuery, options)
    res.status(200).send(books)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/u/all', async (req, res) => {
  try {
    const { searchType, searchValue, page } = req.query
    const options = {
      page: parseInt(page, 10),
      limit: 8,
      sort: { createdAt: -1 }
    }

    let filterQuery = {
      isVisible: true
    }

    if (searchType && searchValue) {
      filterQuery = {
        [searchType.toLowerCase()]: { $regex: searchValue, $options: 'i' },
        isVisible: true
      }
    }

    const books = await Books.paginate(filterQuery, options)
    res.status(200).send(books)
  } catch (error) {
    res.status(500).send(error.message)
  }
  
})

router.get('/all/featured', async (req, res) => {
  try {
    const featured = await Books.find({ isFeatured: true, isVisible: true })

    res.status(200).send(featured)
  } catch (error) {
    res.status(500).send(error.message)
  }
})


router.patch('/:id', adminAuth, async (req, res) => {
  try {

    const update = Object.keys(req.body)
    const book = await Books.findById(req.params.id)

    // if (req.body.coverType) {
    //   if (req.body.coverType === 'Hardback') {
    //     req.body.paperbackPrice = null
    //     if (!req.body.hardbackPrice) {
    //       return res.status(400).send('Please input hardback price.')
    //     }
    //   }
    //   if (req.body.coverType === 'Paperback') {
    //     req.body.hardbackPrice = null
    //     if (!req.body.paperbackPrice) {
    //       return res.status(400).send('Please input paperback price.')
    //     }
    //   }
    // }

    update.forEach(update => book[update] = req.body[update])
    await book.save()

    res.status(200).send(book)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Books.findOneAndDelete(req.params.id)

    res.status(200).send('Success delete')
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router