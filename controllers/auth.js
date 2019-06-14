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
    const result = await User.create(newUser);
    result && res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error })
  }
};

const signin = async (req, res) => {
  try {
    const { login, password } = req.headers;
    const user = await User.findOne({ login });
    if(!user) res.status(404).send({ message: "User not found" });
    const result = await user.comparePasswords(password);
    if(result) {
      const token = jwt.sign({ _id: user._id }, config.secret);
      res.status(200).json(token);
    } else {
      res.status(400).send({ message: "Bad Credentials" });
    }
  } catch (error) {
    res.status(500).send({ error })
  }
};

module.exports = {
  signup,
  signin
};
