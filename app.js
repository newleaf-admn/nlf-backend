const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(helmet())

if (process.env.NODE_ENV === 'production') { // Change here if development or production
  app.use(cors({
    origin: [ 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:8100' , 'http://localhost:8081', 'https://newleafmediallc.netlify.app', 'https://thenewleafmedia.com', 'https://www.thenewleafmedia.com', 'https://our-app-0711.netlify.app' ],
    credentials: true
  }))
} else {
  app.use(cors({
    origin: [ 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:8100' , 'http://localhost:8081', 'https://newleafmediallc.netlify.app', 'https://thenewleafmedia.com', 'https://www.thenewleafmedia.com', 'https://our-app-0711.netlify.app' ],
    credentials: true
  }))
}

require('./startup/db')()
require('./startup/routes')(app)

app.get('/', function (req, res) {
  res.send(`Hello World!, running on ${process.env.PORT}`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
