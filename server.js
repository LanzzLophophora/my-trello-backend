const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const docs = require('express-mongoose-docs');
const mongoose = require('mongoose');
const reload = require('express-reload');

const config = require('./config/');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const connectDatabase = require('./db');

connectDatabase()
  // .on('error', () => { console.log("error") })
  .on('disconnect', connectDatabase)
  .once('open', runServer);

function runServer () {
  const app = express();
  config.port = config.port || process.env.PORT;
  //
  // var path = __dirname + '/server.js';
  // app.use(reload(path));

  app.listen(config.port, function (err){
    if (err) throw err;
    console.log(`🏠 MY-TRELLO is up and running in ${process.env.NODE_ENV} mode at https://${config.host}:${config.port}`)
  });

  docs(app, mongoose);

  app.get('/api', function (req, res) {
    res.send('Hello API');
  });

  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
  }));

  app.use('/api', router);

  app.use(errorHandler);
}
