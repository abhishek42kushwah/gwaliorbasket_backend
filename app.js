var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt = require("./routes/jwt")
var cookieParser = require('cookie-parser');
var cros=require("cors");

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stateCityRouter = require('./routes/statecity');
var companyRouter = require('./routes/company');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var bannerRouter = require('./routes/banner');
var userinterfaceRouter = require('./routes/userinterface');
var productlistRouter = require('./routes/productlist');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());5
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cros());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity', stateCityRouter);
app.use('/userinterface', userinterfaceRouter);

app.use('/company', companyRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/productlist', productlistRouter);
app.use('/banner', bannerRouter);
app.use(jwt())

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
