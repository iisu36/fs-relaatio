const router = require('express').Router()
const { ReadingList } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readingList = await ReadingList.findByPk(req.params.id)
  console.log(user)
  console.log(readingList)
  if (user.id === readingList.userId) {
    await readingList.update(req.body)
    res.json(readingList)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = router
