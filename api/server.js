const port = process.env.PORT || 3500;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./utils/db/mongo.connector');

// Add morgan module
app.use(morgan("combined"));

// Add body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Add cors module
app.use(cors());

// Allow all origins (*)
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  next();
});

// Add routes
app.use('/api/', routes);

// DB connection
global.db = db;
db.init().then(() => console.log("DB connection success!"));

// Start server
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
