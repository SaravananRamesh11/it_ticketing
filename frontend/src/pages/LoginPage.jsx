// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginPage({ setUserRole }) {
//   const [ename, setEName] = useState('');
//   const [eid, setEID] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', { ename, eid });
//       const { role } = res.data;
//       setUserRole(role);
//       localStorage.setItem('userRole', role);
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Employee Name" value={ename} onChange={(e) => setEName(e.target.value)} required />
//         <input type="text" placeholder="Employee ID" value={eid} onChange={(e) => setEID(e.target.value)} required />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default LoginPage; 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth  from '../hooks/login_context_hook'; // Import the AuthContext hook

const LoginPage = () => {
  const [eid, setEid] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { state,dispatch } = useAuth(); // Use the AuthContext hook to get the setUser

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/general/login', {
        eid,
        password
      });
      if(res.data.token){
      dispatch({type:"LOGIN",payload:{...res.data}});
    }
      navigate(`/${res.data.role}`);

      
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={eid}
            onChange={(e) => setEid(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
