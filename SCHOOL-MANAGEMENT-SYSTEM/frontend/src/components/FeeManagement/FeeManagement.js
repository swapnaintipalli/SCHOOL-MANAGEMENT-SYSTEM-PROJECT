import React, { useState } from 'react';
import axios from 'axios';

function FeeManagement() {
  const [fee, setFee] = useState({
    studentId: '',
    feeAmount: '',
    paymentDate: ''
  });

  const handleChange = (e) => {
    setFee({
      ...fee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/addFee', fee);
      alert('Fee information added successfully');
      setFee({
        studentId: '',
        feeAmount: '',
        paymentDate: ''
      });
    } catch (error) {
      console.error('Error adding fee:', error);
      alert('Error adding fee information');
    }
  };

  return (
    <div><center><br></br><br></br>
      <h1>FEE MANAGEMENT</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="text" name="studentId" value={fee.studentId} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label>Fee Amount:</label>
          <input type="text" name="feeAmount" value={fee.feeAmount} onChange={handleChange} required />
        </div><br></br>
        <div>
          <label>Payment Date:</label>
          <input type="date" name="paymentDate" value={fee.paymentDate} onChange={handleChange} required />
        </div><br></br>
        <button type="submit">Add Fee</button>
      </form></center>
    </div>
  );
}

export default FeeManagement;