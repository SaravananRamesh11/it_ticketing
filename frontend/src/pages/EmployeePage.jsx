// import React, { useState } from 'react';
// import axios from 'axios';

// const EmployeePage = () => {
//   const [formData, setFormData] = useState({
//     fname: '',
//     eid: '',
//     eiss: '',
//     edate: '',
//     etime: '',
//     email: ''
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/submit', formData);
//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting ticket:', error);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto' }}>
//       <h2>Submit a Ticket</h2>
//       {submitted ? (
//         <p>🎉 Ticket submitted successfully! You’ll receive a confirmation email.</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="fname" placeholder="Full Name" value={formData.fname} onChange={handleChange} required /><br />
//           <input type="text" name="eid" placeholder="Employee ID" value={formData.eid} onChange={handleChange} required /><br />
//           <input type="text" name="eiss" placeholder="Issue" value={formData.eiss} onChange={handleChange} required /><br />
//           <input type="date" name="edate" value={formData.edate} onChange={handleChange} required /><br />
//           <input type="time" name="etime" value={formData.etime} onChange={handleChange} required /><br />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
//           <button type="submit">Submit Ticket</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EmployeePage;

import React, { useState } from 'react';
import axios from 'axios';

const EmployeePage = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    issue: '',
    date: '',
    time: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tickets/submit', formData);
      setTicketNumber(res.data.ticketNumber);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Submit a Ticket</h2>
      {submitted ? (
        <p>🎉 Ticket submitted successfully! Your ticket number is <strong>{ticketNumber}</strong>. You’ll receive a confirmation email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="employeeName"
            placeholder="Full Name"
            value={formData.employeeName}
            onChange={handleChange}
            required
          /><br />
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          /><br />
          <input
            type="text"
            name="issue"
            placeholder="Issue"
            value={formData.issue}
            onChange={handleChange}
            required
          /><br />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          /><br />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          /><br />
          <button type="submit">Submit Ticket</button>
        </form>
      )}
    </div>
  );
};

export default EmployeePage;
