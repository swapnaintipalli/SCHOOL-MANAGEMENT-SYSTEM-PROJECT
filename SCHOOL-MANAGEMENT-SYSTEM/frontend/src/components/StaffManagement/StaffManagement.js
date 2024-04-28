import React, { useState } from 'react';
import axios from 'axios';

function StaffManagement() {
  const [staff, setStaff] = useState({
    name: '',
    role: '',
    department: ''
  });

  const handleChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/addStaff', staff);
      alert('Staff added successfully');
      setStaff({
        name: '',
        role: '',
        department: ''
      });
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff');
    }
  };

  return (
    <div><center><br></br><br></br>
      <h1>STAFF MANAGEMENT</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={staff.name} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={staff.role} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={staff.department} onChange={handleChange} required />
        </div><br></br>
        <button type="submit">Add Staff</button>
      </form></center>
    </div>
  );
}

export default StaffManagement;