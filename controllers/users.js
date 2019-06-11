const Users = require('../models/users');

exports.all = function (req, res) {
  Users.all(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
};

exports.findById = function (req, res) {
  Users.findById(req.params.id, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
};

exports.create = function (req, res) {
  const user = {
    name: req.body.name,
    password: req.body.password,
    disable: req.body.disable || false
  };

  Users.create(user, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
};

exports.update = function (req, res) {
  Users.update(req.params.id, req.body, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
};

exports.delete = function (req, res) {
  Users.delete(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  })
};
