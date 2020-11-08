
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize=require('./utils/database');

const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const port=process.env.PORT;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(userRouter);
app.use('/admin',adminRouter);

sequelize
  .sync({ force: false })
  // .sync()
  .then((result) => {
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log(`AdminBro is under localhost:${port}/admin`));
// module.exports = app;

