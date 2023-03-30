// Imports
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const {User} = require('../util/models')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Handler for creating a json web token, which helps persist logged-in state
const createToken = (emailAddress, id) => {
  return jwt.sign({ emailAddress, id }, JWT_SECRET_KEY, { expiresIn: 86400000 }); // Sign key with payload (username & id), JWT Secret and expiration of 24 hrs 86400000.
};

// Login & Logout functionality
module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      let foundUser = await User.findOne({ where: { emailAddress: email } }); // Checks if user already exists
      let validPassword = password.length > 7
      let validEmail = email.includes('@')

      if (foundUser) {
        res.status(400).send("User already exists");
      } else if (!validPassword) {
        res.status(400).send("Password has fewer than 8 characters")
      } else if (!validEmail) {
        res.status(400).send("Invalid email address")
      } else {
        const salt = bcrypt.genSaltSync(10); // Defines salt
        const hash = bcrypt.hashSync(password, salt); // Hashes password

        //Creates new user with req body and hashed password
        const newUser = await User.create({
          firstName,
          lastName,
          emailAddress: email,
          hashedPass: hash,
        });

        // Creates token using createToken handler
        const token = createToken(
          newUser.dataValues.emailAddress,
          newUser.dataValues.id
        );
        console.log(newUser);
        console.log("Token: ", token);

        const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

        // Gets month and year user was created
        const options = {month: "long"}
        let month = new Intl.DateTimeFormat("en-US", options).format(newUser.dataValues.createdAt) 
        let year = newUser.dataValues.createdAt.getFullYear()
        let date = month + ' ' + year

        // Sends back data to be used to login new user
        res.status(200).send({
          email: newUser.dataValues.emailAddress,
          userId: newUser.dataValues.userId,
          firstName: newUser.dataValues.firstName,
          token: token,
          exp: exp,
          createdAt: date,
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
      const { email, password } = req.body; // Desctructure request body

      let foundUser = await User.findOne({ where: { emailAddress: email } }); // Finds user in db

      // userAuthenticated compares passwords and returns boolean
      if (foundUser) {
        const userAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        // Creates token IF user is authenticated
        if (userAuthenticated) {
          const token = createToken(
            foundUser.dataValues.emailAddress,
            foundUser.dataValues.id
          );

          const exp = Date.now() + 86400000; // Sets expiration to 24 hrs

          // Gets month and year user was created
          const options = {month: "long"}
          let month = new Intl.DateTimeFormat("en-US", options).format(foundUser.dataValues.createdAt) 
          let year = foundUser.dataValues.createdAt.getFullYear()
          let date = month + ' ' + year

          // Sends data to be used in login handler on frontend
          res.status(200).send({
            email: foundUser.dataValues.emailAddress,
            userId: foundUser.dataValues.userId,
            firstName: foundUser.dataValues.firstName,
            token: token,
            exp: exp,
            createdAt: date,
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
