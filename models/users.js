var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function (callback) {
  db.get().collection('users').find().toArray(
    (err, docs) => {
      callback(err, docs);
    });
};

exports.findById = function (id, callback) {
  db.get().collection('users').findOne({ _id: ObjectID(id) }, (err, doc) => {
    callback(err, doc);
  })
};

exports.create = function (user, callback) {
  db.get().collection('users').insert(user,
    (err, result) => {
      callback(err, result)
    });
};

exports.update = function (id, newData, callback) {
  const user = db.get().collection('users').findOne({ _id: ObjectID(id) });

  db.get().collection('users').updateOne(
    { _id: ObjectID(id) },
    { $set: { ...user, ...newData } },
    (err, result) => {
      callback(err, result)
    });
};

exports.delete = function (id, callback) {
  db.get().collection('users').deleteOne(
    { _id: ObjectID(id) },
    (err, result) => {
      callback(err, result)
    });
};
