const router = require('express').Router()
const { User } = require('../models')
const { UserSession } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  await UserSession.destroy({ where: { user_id: user.id } })

  res.status(204).end()
})

module.exports = router
