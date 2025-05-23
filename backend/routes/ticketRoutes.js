// // backend/routes/ticketRoutes.js
// const express = require('express');
// const router = express.Router();
// const Ticket = require('../models/Ticket');

// // GET all tickets
// router.get('/', async (req, res) => {
//   const tickets = await Ticket.find();
//   res.json(tickets);
// });

// // POST a new ticket
// router.post('/', async (req, res) => {
//   const newTicket = new Ticket(req.body);
//   await newTicket.save();
//   res.status(201).json(newTicket);
// });

// // UPDATE ticket by ID
// router.put('/:id', async (req, res) => {
//   const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedTicket);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Generate a unique 4-digit ticket number
const generateTicketNumber = async () => {
  let ticketNumber;
  let exists = true;
  while (exists) {
    ticketNumber = Math.floor(1000 + Math.random() * 9000);
    exists = await Ticket.findOne({ ticketNumber });
  }
  return ticketNumber;
};

// Submit a ticket
router.post('/submit', async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      issue,
      date,
      time,
      email
    } = req.body;

    const ticketNumber = await generateTicketNumber();

    const ticket = new Ticket({
      ticketNumber,
      employeeName,
      employeeId,
      issue,
      date,
      time,
      email,
      itSupport: '',
      resolution: '',
      status: 'Open'
    });

    await ticket.save();
    res.status(201).json({ message: 'Ticket submitted successfully', ticketNumber });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting ticket' });
  }
});

module.exports = router;