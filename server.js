var express = require('express');
var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClientt;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var usersController = require('./controllers/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello API');
});

app.get('/users', usersController.all);
app.get('/users/:id', usersController.findById);

app.post('/users', usersController.create);

app.put('/users/:id', usersController.update);

app.delete('/users/:id', usersController.delete);

db.connect('mongodb://localhost:27017/listsdb', (err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3012, function () {
    console.log('API app stated');
  });
});
