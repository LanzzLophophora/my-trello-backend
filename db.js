var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = function (url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, function (err, database) {
    if (err) {
      return done(err);
    }
    state.db = database.db('listsdb');
    done();
  })
};

exports.get = function() {
  return state.db
};
