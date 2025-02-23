const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const UserSession = require('./userSession')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

User.hasOne(UserSession)
UserSession.belongsTo(User)

module.exports = { Blog, User, ReadingList, UserSession }
