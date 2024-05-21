var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var app = express();
var session = require('express-session');
const nocache = require('nocache')

app.use(session({
  secret: '123456789',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache())

app.use('/', indexRouter);

module.exports = app;
