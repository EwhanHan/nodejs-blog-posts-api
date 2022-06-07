let express = require('express');
let createErrors = require('http-errors');
let logger = require('morgan');
let bodyParser = require('body-parser');

/* import routes */
let pingRoutes = require('./Routes/pingRoutes');
let blogRoutes = require('./Routes/blogRoutes');

/* initialize middleware */
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

/* reserve for /api/apis */
app.use('/api', pingRoutes);
app.use('/api', blogRoutes);

/* Error handling */
app.use((err, req, res, next) => {
  next(createErrors(404, "We couldn't find this route :("));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message || 'something went wrong with the app!' });
});

/* port */
app.listen(3000);

/* Export app */
module.exports = app;
