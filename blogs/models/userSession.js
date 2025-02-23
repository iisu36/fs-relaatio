const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class UserSession extends Model {}

UserSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userSession',
  }
)

module.exports = UserSession
