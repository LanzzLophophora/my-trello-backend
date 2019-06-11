const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

const signup = async (req, res, next) => {
  const credentials = req.body;

  try {
    const { login } = credentials;
    const user = await User.findOne({ login });
    if (user) {
      return next({
        status: 409,
        message: "This login is already used"
      });
    }
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }

  try {
    const newUser = {
      ...credentials,
      isAdmin: credentials.isAdmin || false,
      disable: credentials.disable || false
    };
    await User.create(newUser);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }

  res.sendStatus(200);
};

const signin = async (req, res, next) => {
  const { login, password } = req.headers;
  console.log(req);

  const user = await User.findOne({ login });

  if(!user) {
    return next({
      status: 400,
      message: 'User not found'
    });
  }

  try {
    const result = await user.comparePasswords(password);
    if(result) {
      const token = jwt.sign({ _id: user._id }, config.secret);
      res.json(token);
    } else {
      return next({
        status: 400,
        message: 'Bad Credentials'
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: 'Bad Credentials'
    });
  }
};

module.exports.signin = signin;
module.exports.signup = signup;
