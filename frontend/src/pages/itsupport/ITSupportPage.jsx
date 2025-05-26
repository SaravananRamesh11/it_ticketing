// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './it.css';

// function ITSupportPage() {
//   const [tickets, setTickets] = useState([]);
//   const [showInput, setShowInput] = useState({});
//   const [resolutions, setResolutions] = useState('');
//   const id = localStorage.getItem('id');

//   useEffect(() => {
//     const fetchOpenTickets = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/api/it_support/get_open', { id });
//         setTickets(response.data);
//       } catch (error) {
//         console.error('Error fetching open tickets:', error);
//       }
//     };

//     // fetchOpenTickets();
//   }, []);

//   const handleShowInput = (ticketId) => {
//     setShowInput(prev => ({ ...prev, [ticketId]: true }));
//   };

//   const handleResolutionChange = (ticketId, value) => {
//     setResolutions(prev => ({ ...prev, [ticketId]: value }));
//   };

//   const handleCloseTicket = async (ticketId) => {
//     //const resolution = resolutions[ticketId];
//     console.log("before alert")
//     if (!resolutions) return alert('Please enter a resolution.');
//     console.log("after alert")
//     try {
//       await axios.post('http://localhost:5000/api/it_support/close_ticket', {
//         ticketId,
//         resolutions
//       });

//       setTickets(prev => prev.filter(t => t._id !== ticketId)); // remove closed ticket from UI
//     } catch (err) {
//       console.error('Error closing ticket:', err);
//     }
//   };

//   return (
//     <div className="it-support-page">
//       <h1 className="title">IT Support Dashboard</h1>
//       <div className="ticket-list">
//         {tickets.length > 0 ? (
//           tickets.map((ticket) => (
//             <div key={ticket._id} className="ticket-card">
//               <h3>{ticket.issue}</h3>
//               <p><strong>Employee:</strong> {ticket.employeeName}</p>
//               <p><strong>ID:</strong> {ticket.employeeId}</p>
//               <p><strong>Email:</strong> {ticket.email}</p>
//               <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
//               <p><strong>Time:</strong> {ticket.time}</p>
//               <p><strong>Status:</strong> {ticket.status}</p>

//               {!showInput[ticket._id] ? (
//                 <button className="close-btn" onClick={() => handleShowInput(ticket._id)}>Close Ticket</button>
//               ) : (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Add description"
//                     value={resolutions[ticket._id] || ''}
//                     onChange={(e) => handleResolutionChange(ticket._id, e.target.value)}
//                     className="resolution-input"
//                   />
//                   <button className="ok-btn" onClick={()=> handleCloseTicket(ticket._id)}>OK</button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No open tickets assigned to you.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ITSupportPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './it.css';

// function ITSupportPage() {
//   const [tickets, setTickets] = useState([]);
//   const [resolution, setResolution] = useState('');
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const id = localStorage.getItem('id');

//   useEffect(() => {
//     const fetchOpenTickets = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/api/it_support/get_open', { id });
//         setTickets(response.data);
//       } catch (error) {
//         console.error('Error fetching open tickets:', error);
//       }
//     };

//     fetchOpenTickets();
//   }, []);

//   const handleShowInput = (ticketId) => {
//     setSelectedTicketId(ticketId);
//     setResolution('');
//   };

//   const handleCloseTicket = async () => {
//     if (!resolution.trim()) return alert('Please enter a resolution.');

//     try {
//       await axios.post('http://localhost:5000/api/it_support/close_ticket', {
//         ticketId: selectedTicketId,
//         resolution
//       });

//       setTickets(prev => prev.filter(t => t._id !== selectedTicketId)); // Remove from UI
//       setSelectedTicketId(null); // Reset UI
//       setResolution('');
//     } catch (err) {
//       console.error('Error closing ticket:', err);
//     }
//   };

//   return (
//     <div className="it-support-page">
//       <h1 className="title">IT Support Dashboard</h1>
//       <div className="ticket-list">
//         {tickets.length > 0 ? (
//           tickets.map((ticket) => (
//             <div key={ticket._id} className="ticket-card">
//               <h3>{ticket.issue}</h3>
//               <p><strong>Employee:</strong> {ticket.employeeName}</p>
//               <p><strong>ID:</strong> {ticket.employeeId}</p>
//               <p><strong>Email:</strong> {ticket.email}</p>
//               <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
//               <p><strong>Time:</strong> {ticket.time}</p>
//               <p><strong>Status:</strong> {ticket.status}</p>

//               {selectedTicketId !== ticket._id ? (
//                 <button className="close-btn" onClick={() => handleShowInput(ticket._id)}>Close Ticket</button>
//               ) : (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Add description"
//                     value={resolution}
//                     onChange={(e) => setResolution(e.target.value)}
//                     className="resolution-input"
//                   />
//                   <button className="ok-btn" onClick={handleCloseTicket}>OK</button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No open tickets assigned to you.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ITSupportPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './it.css';

function ITSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [showInput, setShowInput] = useState({});
  const [resolutions, setResolutions] = useState({}); // Changed to object
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/it_support/get_open', { id });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching open tickets:', error);
      }
    };

    fetchOpenTickets(); // Uncommented this important line
  }, [id]); // Added id as dependency

  const handleShowInput = (ticketId) => {
    setShowInput(prev => ({ ...prev, [ticketId]: true }));
  };

  const handleResolutionChange = (ticketId, value) => {
    setResolutions(prev => ({ ...prev, [ticketId]: value }));
  };

  // const handleCloseTicket = async (ticketId) => {
  //   const resolution = resolutions[ticketId];
    
  //   if (!resolution || resolution.trim() === '') {
  //     alert('Please enter a resolution.');
  //     return;
  //   }

  //   try {
  //     await axios.post('http://localhost:5000/api/it_support/close_ticket', {
  //       ticketId,
  //       resolution // Changed from resolutions to resolution
  //     });

  //     setTickets(prev => prev.filter(t => t._id !== ticketId));
  //     setShowInput(prev => ({ ...prev, [ticketId]: false }));
  //     setResolutions(prev => {
  //       const newResolutions = { ...prev };
  //       delete newResolutions[ticketId];
  //       return newResolutions;
  //     });
  //   } catch (err) {
  //     console.error('Error closing ticket:', err);
  //     alert('Failed to close ticket. Please try again.');
  //   }
  // };
  const handleCloseTicket = async (ticketId) => {
  const resolution = resolutions[ticketId];
  
  if (!resolution || resolution.trim() === '') {
    alert('Please enter a resolution.');
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/it_support/close_ticket', {
      id: ticketId, // ✅ Must match backend expected key
      resolution
    });

    setTickets(prev => prev.filter(t => t._id !== ticketId));
    setShowInput(prev => ({ ...prev, [ticketId]: false }));
    setResolutions(prev => {
      const newResolutions = { ...prev };
      delete newResolutions[ticketId];
      return newResolutions;
    });
  } catch (err) {
    console.error('Error closing ticket:', err);
    alert('Failed to close ticket. Please try again.');
  }
};



  return (
    <div className="it-support-page">
      <h1 className="title">IT Support Dashboard</h1>
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card">
              <h3>{ticket.issue}</h3>
              <p><strong>Employee:</strong> {ticket.employeeName}</p>
              <p><strong>ID:</strong> {ticket.employeeId}</p>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {ticket.time}</p>
              <p><strong>Status:</strong> {ticket.status}</p>

              {!showInput[ticket._id] ? (
                <button className="close-btn" onClick={() => handleShowInput(ticket._id)}>Close Ticket</button>
              ) : (
                <>
                  <textarea
                    placeholder="Enter resolution description"
                    value={resolutions[ticket._id] || ''}
                    onChange={(e) => handleResolutionChange(ticket._id, e.target.value)}
                    className="resolution-input"
                    rows={3}
                  />
                  <div className="action-buttons">
                    <button className="ok-btn" onClick={() => handleCloseTicket(ticket._id)}>Submit</button>
                    <button className="cancel-btn" onClick={() => setShowInput(prev => ({ ...prev, [ticket._id]: false }))}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No open tickets assigned to you.</p>
        )}
      </div>
    </div>
  );
}

export default ITSupportPage;
