// var MongoClient = require('mongodb').MongoClient;
//
// var state = {
//   db: null
// };
//
// exports.connect = function (url, done) {
//   if (state.db) {
//     return done();
//   }
//
//   MongoClient.connect(url, function (err, database) {
//     if (err) {
//       return done(err);
//     }
//     state.db = database.db('listsdb');
//     done();
//   })
// };
//
// exports.get = function() {
//   return state.db
// };
const mongoose = require('mongoose');
const bluebird = require('bluebird');
// mongoose.Promise = require('bluebird');


const connectDatabase = () => {
  mongoose.Promise = bluebird;
  mongoose.connect('mongodb://localhost:27017/listsdb', { useNewUrlParser: true }, console.log('Mongo connected'));
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  return mongoose.connection;
};

module.exports = connectDatabase;
