const path = require('path');

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
const reviewRouter = require('./routes/reviewRoute');
const bookingsRouter = require('./routes/bookingRoute');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this ip, please try again in an hour',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(mongosanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAvarage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use((req, res, next) => {
  req.reqtime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/review/', reviewRouter);
app.use('/', viewRouter);
app.use('/api/v1/booking', bookingsRouter);

app.all('*', (req, res, next) => {
  next(
    res.status(404).json({
      status: 'failed',
      messege: `Can't find ${req.originalUrl} on this server`,
    })
  );
});
module.exports = app;
