const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { UserSession, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      const decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const session = await UserSession.findOne({
        where: [
          { token: authorization.substring(7) },
          { user_id: decodedToken.id },
        ],
      })
      if (!session) {
        return res.status(401).json({ error: 'Session expired, please login' })
      }
      req.decodedToken = decodedToken
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Token missing' })
  }
  next()
}

module.exports = { tokenExtractor }
