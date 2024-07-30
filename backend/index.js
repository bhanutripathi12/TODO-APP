const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user.route');
const todoRoutes = require('./routes/todo.route');

const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URI = process.env.MONGO_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connection Success!!!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});