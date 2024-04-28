import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Academics() {
  // Academic State and Functions
  const [academic, setAcademic] = useState({
    class: '',
    subject: '',
    schedule: '',
    syllabus: ''
  });

  const [academicsList, setAcademicsList] = useState([]);

  const handleAcademicChange = (e) => {
    setAcademic({
      ...academic,
      [e.target.name]: e.target.value
    });
  };

  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/add-academic', academic);
      alert('Academic information added successfully');
      setAcademic({
        class: '',
        subject: '',
        schedule: '',
        syllabus: ''
      });
      fetchAcademics();
    } catch (error) {
      console.error(error);
      alert('Error adding academic information');
    }
  };

  const fetchAcademics = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get-academics');
      setAcademicsList(res.data.academics);
    } catch (error) {
      console.error(error);
      alert('Error retrieving academic information');
    }
  };

  useEffect(() => {
    fetchAcademics();
  }, []);

  return (
    <div className="App"><center>
      {/* Academics */}
      <div><br></br><br></br>
        <h1>ACADEMICS</h1>
        <form onSubmit={handleAcademicSubmit}>
          <div>
            <label>Class:</label>
            <input type="text" name="class" value={academic.class} onChange={handleAcademicChange} required />
          </div><br></br>
          <div>
            <label>Subject:</label>
            <input type="text" name="subject" value={academic.subject} onChange={handleAcademicChange} required />
          </div><br></br>
          <div>
            <label>Schedule:</label>
            <input type="text" name="schedule" value={academic.schedule} onChange={handleAcademicChange} required />
          </div><br></br>
          <div>
            <label>Syllabus:</label>
            <textarea name="syllabus" value={academic.syllabus} onChange={handleAcademicChange} required />
          </div>
          <button type="submit">Add Academic</button>
        </form>

    
     
      </div></center>
    </div>
  );
}

export default Academics;