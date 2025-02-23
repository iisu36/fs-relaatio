const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId'] } },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read
  }
  const user = await User.findByPk(req.params.id, {
    include: [
      { model: Blog, attributes: { exclude: ['userId'] } },
      {
        model: Blog,
        as: 'markedBlogs',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['id', 'read'], where },
      },
    ],
  })
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.update(req.body, {
    where: { username: req.params.username },
  })
  res.json(user)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

router.use(errorHandler)

module.exports = router
