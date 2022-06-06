let express = require('express');
let createErrors = require('http-errors');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

let pingRoutes = require('./Routes/pingRoutes');

let app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

/* reserve for /api/apis */
app.use('/api', pingRoutes);

/* Error handling */
app.use((req, res, next) => {
  next(createErrors(404, "We couldn't find this route :("));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message || 'something went wrong with the app!' });
});

app.listen(3000);

module.exports = app;
