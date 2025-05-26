const express=require("express")
const Ticket=require("../models/Ticket")
const User=require("../models/User")
const sendEmail=require("../services/mailservice")
const mongoose=require("mongoose")



const user_detail = async (req, res) => {
  try {
    const { id } = req.body;

    // Improved ID validation
    if (!id || typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
}

const password =async (req, res) => {
  const { id, newPassword } = req.body;

  if (!id || !newPassword) {
    return res.status(400).json({ message: 'User ID and new password are required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const ticket =async (req, res) => {
  try {
    const { employeeName, employeeId, issue, date, time, email, id } = req.body;

    // 1. Validate the requesting employee
    const employee = await User.findOne({ _id: id });
    if (!employee || employee.employeeId !== employeeId || employee.role !== 'employee') {
      return res.status(400).json({ message: 'Invalid employee ID or role' });
    }

    // 2. Fetch all IT support members
    const allSupport = await User.find({ role: 'itsupport' }).lean();
    if (allSupport.length === 0) {
      return res.status(500).json({ message: 'No IT support members found' });
    }

    // 3. Get open ticket counts by itSupport (which is a string field)
    const openTicketCounts = await Ticket.aggregate([
      { $match: { status: 'Open' } },
      { $group: { _id: '$itSupport', count: { $sum: 1 } } }
    ]);

    const ticketMap = {};
    openTicketCounts.forEach(t => {
      ticketMap[t._id] = t.count;
    });

    // 4. Choose IT support with least number of open tickets
    let selectedSupport = allSupport[0];
    let minCount = ticketMap[selectedSupport.employeeName] || 0;

    allSupport.forEach(support => {
      const count = ticketMap[support.employeeName] || 0;
      if (count < minCount) {
        minCount = count;
        selectedSupport = support;
      }
    });

    // 5. Create and save the ticket
    const newTicket = new Ticket({
      employeeName,
      employeeId,
      issue,
      date: new Date(date),
      time,
      email,
      itSupport: selectedSupport.employeeName  // Store the support member's name
    });

    await newTicket.save();

    return res.status(201).json({ message: 'Ticket created successfully!' });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ message: 'Server error while creating ticket' });
  }
};



module.exports={ticket,user_detail,password}