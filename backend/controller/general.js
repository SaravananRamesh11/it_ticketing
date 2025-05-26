const express=require("express")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const User=require("../models/User")

const login=async (req, res) => {
  const { eid, password } = req.body;
  try {
    const user = await User.findOne({ employeeId: eid });
    if (!user) return res.status(401).json({ message: 'Invalid EmployeeId' });

    if(user.password===password)
    {
      const token = jwt.sign({ role: user.role, id: user._id }, "igiuug3erq", { expiresIn: '1h' });
      const id =user._id;
      const role=user.role;
      res.status(200).json({token,id,role})

    }
    else{
      res.status(401).json({ message: 'Invalid Password' });
    }
  
  }
 catch(error)
 {
     res.status(500).json({ error: 'Server error' });
 }

}

module.exports={login}