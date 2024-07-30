const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const user_routes = require('./routes/user.route');
const todo_routes = require('./routes/todo.route');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGO_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Enable SSL for MongoDB connections
  sslValidate: false, // Set to true if you have a valid certificate
})
.then(() => {
  console.log('MongoDB Connection Success!!!');
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
});

// Routes
app.use('/user', user_routes);
app.use('/todo', todo_routes);

// Handle 404 for unmatched routes
app.use((req, res, next) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
