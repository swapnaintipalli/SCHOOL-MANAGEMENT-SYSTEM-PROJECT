import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Grading() {
  const [grade, setGrade] = useState({
    studentId: '',
    subject: '',
    gradeValue: ''
  });

  const [gradesList, setGradesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  const handleGradeChange = (e) => {
    setGrade({
      ...grade,
      [e.target.name]: e.target.value
    });
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/add-grade', grade);
      alert('Grade added successfully');
      setGrade({
        studentId: '',
        subject: '',
        gradeValue: ''
      });
      fetchGrades();
    } catch (error) {
      console.error(error);
      alert('Error adding grade');
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get-grades');
      setGradesList(res.data.grades);
    } catch (error) {
      console.error(error);
      alert('Error retrieving grades');
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get-students');
      setStudentsList(res.data.students);
    } catch (error) {
      console.error(error);
      alert('Error retrieving students');
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get-enrolled-students');
      setStudentsList(res.data.students);
    } catch (error) {
      console.error(error);
      alert('Error retrieving enrolled students');
    }
  };

  useEffect(() => {
    fetchGrades();
    fetchStudents();
    fetchEnrolledStudents();
  }, []);

  return (
    <div className="App">
      <center><br></br><br></br>
        <div>
          <h1>GRADING</h1>
          <form onSubmit={handleGradeSubmit}>
            <div>
              <label>Student:</label>
              <select name="studentId" value={grade.studentId} onChange={handleGradeChange} required>
                <option value="">Select Student</option>
                {studentsList.map((student) => (
                  <option key={student._id} value={student._id}>{student.name}</option>
                ))}
              </select>
            </div><br></br>
            <div>
              <label>Subject:</label>
              <input type="text" name="subject" value={grade.subject} onChange={handleGradeChange} required />
            </div><br></br>
            <div>
              <label>Grade:</label>
              <input type="text" name="gradeValue" value={grade.gradeValue} onChange={handleGradeChange} required />
            </div><br></br>
            <button type="submit">Add Grade</button>
          </form>

          <div>
            <h2>Grades</h2>
            <ul>
              {gradesList.map((item, index) => (
                <li key={index}>
                  <strong>Student:</strong> {item.studentId.name}, <strong>Subject:</strong> {item.subject}, <strong>Grade:</strong> {item.gradeValue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Grading;