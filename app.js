const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`route ${req.originalUrl} not found`);
  // err.statusCode = 404;
  // err.status = 'fail';

  next(new AppError(`route ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
