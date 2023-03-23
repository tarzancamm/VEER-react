// Imports
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const {User} = require('../util/models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Handler for creating a json web token, which helps persist logged-in state
const createToken = (username, id) => {
  return jwt.sign({ username, id }, JWT_SECRET_KEY, { expiresIn: 86400000 }); // Sign key with payload (username & id), JWT Secret and expiration of 24 hrs 86400000.
};

// Login & Logout functionality
module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, username, password } = req.body;

      let foundUser = await User.findOne({ where: { username: username } }); // Checks if user already exists
      let validPassword = password.length > 6
      let validEmail = username.includes('@')

      if (foundUser) {
        res.status(400).send("User already exists");
      } else if (!validPassword) {
        res.status(400).send("Password has fewer than 7 characters")
      } else if (!validEmail) {
        res.status(400).send("Invalid email address")
      } else {
        const salt = bcrypt.genSaltSync(10); // Defines salt
        const hash = bcrypt.hashSync(password, salt); // Hashes password

        //Creates new user with req body and hashed password
        const newUser = await User.create({
          firstName,
          lastName,
          username,
          hashedPass: hash,
        });

        // Creates token using createToken handler
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log(newUser);
        console.log("Token: ", token);

        const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

        // Sends back data to be used to login new user
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (err) {
      console.log("Error registering user");
      console.log(err);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body; // Desctructure request body

      let foundUser = await User.findOne({ where: { username: username } }); // Finds user in db

      // userAuthenticated compares passwords and returns boolean
      if (foundUser) {
        const userAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        // Creates token IF user is authenticated
        if (userAuthenticated) {
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );

          const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

          // Sends data to be used in login handler on frontend
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token: token,
            exp: exp,
          });
        } else {
          console.log("Incorrect password");
          res.sendStatus(400)
        }
      } else {
        console.log("User not found");
        res.sendStatus(400)
      }
    } catch (err) {
      console.log("Error logging in");
      console.log(err);
      res.sendStatus(400);
    }
  },
};
