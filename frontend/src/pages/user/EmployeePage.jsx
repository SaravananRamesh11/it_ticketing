// import React, { useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// // ✅ Yup validation schema
// const schema = yup.object().shape({
  
//   issue: yup.string().required('Issue is required'),
//   date: yup.date().required('Date is required').typeError('Invalid date'),
//   time: yup
//     .string()
//     .required('Time is required')
//     .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time'),
 
// });

// const EmployeePage = () => {
//   const navigate=useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors }
//   } = useForm({ resolver: yupResolver(schema) });

//   const [submitted, setSubmitted] = useState(false);

//   const onSubmit = async (data) => {
//     try {
//       console.log(data)
//       const id=localStorage.getItem('id');
//       data.id=id;
//       console.log(id)
//       const res1=await axios.post("http://localhost:5000/api/general/details",{
//       data
//       }, // Request body
//       {
//         headers: {
//           'Content-Type': 'application/json' // Explicitly set content type
//         }
//       })
//       console.log(res1)
//       data.name=res1.name
//       data.email=res1.email
//       data.employeeId=res1.employeeId
//       const res = await axios.post('http://localhost:5000/api/user/ticket', data);
//       setSubmitted(true);
//       reset();
//     } 
//     catch (error) {
//   console.error('Password update failed:', error);
//   const message = error.response?.data?.message || 'Failed to update password';
//   alert(message);
// }

//   };

//   function userpage()
//   {
//     navigate("/userdetails")
//   }

//   return (
//     <div style={styles.container}>
//       <button style={styles.detailsButton} onClick={userpage} >Employee Details</button>
//       <div style={styles.formContainer}>
//         <h2 style={styles.title}>Submit a Ticket</h2>
//         {submitted ? (
//           <p style={styles.success}>
//             🎉 Ticket submitted successfully! You’ll receive a confirmation email.
//           </p>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
//             {/* <input style={styles.input} placeholder="Full Name" {...register('employeeName')} />
//             {errors.employeeName && <p style={styles.error}>{errors.employeeName.message}</p>}

//             <input style={styles.input} placeholder="Employee ID" {...register('employeeId')} />
//             {errors.employeeId && <p style={styles.error}>{errors.employeeId.message}</p>} */}

//             <input style={styles.input} placeholder="Issue" {...register('issue')} />
//             {errors.issue && <p style={styles.error}>{errors.issue.message}</p>}

//             <input style={styles.input} type="date" {...register('date')} />
//             {errors.date && <p style={styles.error}>{errors.date.message}</p>}

//             <input style={styles.input} type="time" {...register('time')} />
//             {errors.time && <p style={styles.error}>{errors.time.message}</p>}

//             {/* <input style={styles.input} placeholder="Email" type="email" {...register('email')} />
//             {errors.email && <p style={styles.error}>{errors.email.message}</p>} */}

//             <button style={styles.submitButton} type="submit">
//               Submit Ticket
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  issue: yup.string().required('Issue is required'),
  date: yup.date().required('Date is required').typeError('Invalid date'),
  time: yup
    .string()
    .required('Time is required')
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time'),
});

const EmployeePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
     if (data.date) {
      data.date = new Date(data.date).toISOString();
    }
    setIsLoading(true);
    try {
      console.log(data)
      const id = localStorage.getItem('id');
      data.id=id;
      if (!id) {
        alert('User ID not found. Please login again.');
        return;
      }

      // Get user details
      const userResponse = await axios.post(
        "http://localhost:5000/api/general/details",
        { id }, // Correct request body
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Properly access response data
      const userData = userResponse.data;
      console.log(" on submit of employee page User details:", userData);

      // Prepare ticket data
      const ticketData = {
        ...data,
        employeeName: userData.employeeName,
        email: userData.email,
        employeeId: userData.employeeId
      };
      console.log("ticket data",ticketData)

      // Submit ticket
      await axios.post('http://localhost:5000/api/user/ticket', {ticketData});
      
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      const message = error.response?.data?.message || 'Failed to submit ticket';
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  function userpage() {
    navigate("/userdetails");
  }

  return (
    <div style={styles.container}>
      <button style={styles.detailsButton} onClick={userpage}>
        Employee Details
      </button>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Submit a Ticket</h2>
        {submitted ? (
          <p style={styles.success}>
            🎉 Ticket submitted successfully! You'll receive a confirmation email.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input style={styles.input} placeholder="Issue" {...register('issue')} />
            {errors.issue && <p style={styles.error}>{errors.issue.message}</p>}

            <input style={styles.input} type="date" {...register('date')} />
            {errors.date && <p style={styles.error}>{errors.date.message}</p>}

            <input style={styles.input} type="time" {...register('time')} />
            {errors.time && <p style={styles.error}>{errors.time.message}</p>}

            <button 
              style={styles.submitButton} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ... your styles remain the same ...



const styles = {
  container: {
    position: 'relative',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  detailsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'background-color 0.2s ease-in-out',
  },
  formContainer: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '8px',
    fontSize: '0.9rem',
  },
  success: {
    backgroundColor: '#d4edda',
    padding: '1rem',
    borderRadius: '8px',
    color: '#155724',
  },
};

export default EmployeePage;
