const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // simple validation for a 10-digit number
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // simple validation for an email address
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // minimum length of 6 characters
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; // custom validation to check if confirmPassword matches password
      },
      message: 'Passwords do not match'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
