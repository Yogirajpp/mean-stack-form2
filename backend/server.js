require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// routes
const formRoutes = require('./routes/formRoutes');

// express app
const app = express();

// middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/forms', formRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URL, {})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database:', error);
  });
