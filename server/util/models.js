const {DataTypes} = require('sequelize')
const db = require('./database')

module.exports = {
    User: db.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashed_pass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }),

    Adventure: db.define('adventure', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(500),
        },
        coordinates: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}