const mongoose = require('mongoose'); 

const ticketSchema = new mongoose.Schema({
  ticketNumber: Number,
  employeeName: String,
  employeeId: String,
  issue: String,
  date: String,
  time: String,
  email: String,
  itSupport: String,
  resolution: String,
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);