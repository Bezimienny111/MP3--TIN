var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

// Dodane
const categoryRouter = require('./routes/categoryRoute');
const newsRouter = require('./routes/newsRoute');
const newsmanRouter = require('./routes/newsmanRoute');
const sequelizeInit = require('./config/sequelize/init');
const catApiRouter = require('./routes/api/CategoryApiRoute');
const newsmanApiRouter = require('./routes/api/NewsmanApiRoute');
const newsApiRouter = require('./routes/api/NewsApiRoute');
const authUtils=require('./utils/authUtils');

var app = express();
const session = require('express-session');
const i18n = require ('i18n');
i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true, 
  cookie: 'acme-hr-lang', 
});




app.use(cookieParser('secret'));
app.use(i18n.init);
app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});



app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
 
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Dodane Api
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/news', newsRouter);
app.use('/newsman',authUtils.permitAuthenticatedUser, newsmanRouter);
app.use('/api/category', catApiRouter);
app.use('/api/newsman', newsmanApiRouter);
app.use('/api/news', newsApiRouter);




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


sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;
