import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage/HomePage';
import StudentEnrollment from './components/StudentEnrollment/StudentEnrollment';
import Academics from './components/Academics/Academics';
import Grading from './components/Grading/Grading';
import StaffManagement from './components/StaffManagement/StaffManagement';
import FeeManagement from './components/FeeManagement/FeeManagement';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-enrollment" element={<StudentEnrollment/>} />
          <Route path="/Academics" element={<Academics/>} />
          <Route path="/Grading" element={<Grading/>} />
          <Route path="/StaffManagement" element={<StaffManagement/>} />
          <Route path="/FeeManagement" element={<FeeManagement/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
