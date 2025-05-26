import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dumb, setdumb] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const id = localStorage.getItem('id');
        const res = await axios.post(
          'http://localhost:5000/api/user/detail',
          { id },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setEmployee(res.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Failed to load employee details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [showPasswordFields]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.put('http://localhost:5000/api/user/password', {
        id: employee._id,
        newPassword,
      });

      alert('Password updated successfully!');
      setShowPasswordFields(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password update failed:', error);
      alert('Failed to update password');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading employee details...</div>;
  }

  if (!employee) {
    return <div style={styles.error}>No employee data available.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee Profile</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {employee.employeeName}</p>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Role:</strong> {employee.role}</p>
       

        <button style={styles.button} onClick={() => setShowPasswordFields(!showPasswordFields)}>
          Change Password
        </button>

        {showPasswordFields && (
          <div style={styles.passwordSection}>
            <input
              style={styles.input}
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button style={styles.okButton} onClick={handlePasswordChange}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
  },
  card: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    lineHeight: '1.8',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease-in-out',
  },
  input: {
    display: 'block',
    width: '100%',
    marginTop: '10px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  okButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  passwordSection: {
    marginTop: '15px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: '2rem',
  },
};

export default Detail;
