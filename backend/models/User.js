// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   employeeId: String,
//   role: {
//     type: String,
//     enum: ['employee', 'itsupport', 'admin', 'superuser'],
//     default: 'employee'
//   }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeName: String,
  employeeId: String,
  role: String
});

module.exports = mongoose.model('User', userSchema);