// Imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {PORT, DATABASE_URL} = process.env
const db = require('./util/database')
const {seedCountries} = require('./util/seed')

// Models
const {User, Adventure, Country} = require('./util/models')

// Store express in variable
const server = express()
 
// Middleware to run on every endpoint
server.use(express.json()) // Parses incoming JSON requests and puts the parsed data in req.body
server.use(cors()) // Client & Server can run on seperate ports

// Sequelize Associations
User.hasMany(Adventure)
Adventure.belongsTo(User)
Country.hasMany(Adventure)
Adventure.belongsTo(Country)

// Endpoints


// Sync db and run server. { force: true }
db.sync()
    // .then(() => seedCountries())
    .then(() => {
    server.listen(PORT, () => {
      console.log(`Listening on Port: ${PORT}`);
    });
});