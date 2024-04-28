import React, { useState } from 'react';
import axios from 'axios';
 // You can create StudentEnrollment.css for styling if needed

const StudentEnrollment = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/enroll', { name, grade });
      alert('Student enrolled successfully');
      // Clear form fields after successful enrollment
      setName('');
      setGrade('');
    } catch (error) {
      console.error('Error enrolling student:', error);
      alert('Error enrolling student');
    }
  };

  return (
    <div>
      <h2>Student Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" required />
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
};

export default StudentEnrollment;
