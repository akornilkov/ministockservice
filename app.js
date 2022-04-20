var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
//var closedRouter = require('./routes/closed');
var tickersRouter = require('./routes/tickers');
var usersRouter = require('./routes/users');

const {IsUserAuthorized, verifyUserToken} = require('./controllers/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/tickers', tickersRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', user: req.user});
});

app.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', { title: 'MiniStockService: Вход' });
  }
});

app.get('/register', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('register', { title: 'MiniStockService: Регистрация' });
  }
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
