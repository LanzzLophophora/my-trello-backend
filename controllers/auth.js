const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

const signup = async (req, res) => {
  try {
    const credentials = req.body;
    const { login } = credentials;
    const user = await User.findOne({ login });
    if (user) res.status(409).send({ message: "This login is already used" });
    const newUser = {
      ...credentials,
      isAdmin: credentials.isAdmin || false,
      disable: credentials.disable || false
    };
    await User.create(newUser);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error })
  }
};

const signin = async (req, res) => {
  try {
    const { login, password } = req.headers;
    if(!login || !password) res.status(400).send({ message: "Bad credentials" });
    const user = await User.findOne({ login });
    if(!user) res.status(404).send({ message: "User not found" });
    const result = await user.comparePasswords(password);
    if(result) {
      const token = jwt.sign({ _id: user._id }, config.authentication.secret);
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).send({ error })
  }
};

module.exports = {
  signup,
  signin
};
