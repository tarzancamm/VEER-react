// Imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {PORT} = process.env
const db = require('./util/database')
const {seedCountries} = require('./util/seed')

// Models
const {User, Adventure} = require('./util/models')

// Store express in variable
const server = express()

// Controller functions
const {login, register} = require('./controllers/auth')
const {getAllAdventures, addAdventure} = require('./controllers/adventures')
 
// Middleware to run on every endpoint
server.use(express.json()) // Parses incoming JSON requests and puts the parsed data in req.body
server.use(cors()) // Client & Server can run on seperate ports

// Sequelize Associations
User.hasMany(Adventure)
Adventure.belongsTo(User)

// Endpoints
server.post('/register', register)
server.post('/login', login)
server.get('/adventures', getAllAdventures)
server.post('/add-adventure', addAdventure)

// Sync db and run server. { force: true } in db.sync to drop all tables. { alter: true} to update tables.
db.sync()
    // .then(() => seedCountries())
    .then(() => {
    server.listen(PORT, () => {
      console.log(`Listening on Port: ${PORT}`);
    });
});