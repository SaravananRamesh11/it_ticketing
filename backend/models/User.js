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
  role: String,
  password:String
});

userSchema.statics.getNameById = async function (_id) {
  const user = await this.findById(_id).lean();
  return user?.employeeName || null;
};




module.exports = mongoose.model('User', userSchema);