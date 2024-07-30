const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['1', '0'], // Define possible values if applicable
    default: '1'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  versionKey: false // Disables the __v field
});

const ToDo = mongoose.model('todos', ToDoSchema);

module.exports = ToDo;
