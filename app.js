const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const teacherRouter = require('./routes/teacher');
const studentRouter = require('./routes/student');

const app = express();


// MongoDB Atlas connection
require('dotenv').config(); // load environment variables

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

// error handler
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

module.exports = app;
