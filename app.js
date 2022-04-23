const express = require('express');
const morgan = require('morgan');

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
  return res.status(404).json({
    staus: 'fail',
    message: `route ${req.originalUrl} not found`,
  });
});

module.exports = app;
