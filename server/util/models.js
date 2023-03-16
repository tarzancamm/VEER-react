const {DataTypes} = require('sequelize')
const db = require('./database')

module.exports = {
    User: db.define('user', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashedPass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }),

    Adventure: db.define('adventure', {
        adventureId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        adventureName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adventureCost: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        adventureDescription: {
            type: DataTypes.STRING(500),
        }
    }),

    Country: db.define('country', {
        countryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        countryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}