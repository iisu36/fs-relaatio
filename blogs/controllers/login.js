const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User } = require('../models')
const { UserSession } = require('../models')

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })

  const passwordCorrect = password === 'salainen'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin',
    })
  }

  const token = jwt.sign(userForToken, SECRET)

  await UserSession.create({ token, userId: user.id })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
