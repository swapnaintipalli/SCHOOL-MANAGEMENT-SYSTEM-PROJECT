// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

// Student Model
const Student = mongoose.model('Student', {
  name: String,
  grade: String
});

// Endpoint for enrolling students (POST)
app.post('/api/enroll', async (req, res) => {
  try {
    const { name, grade } = req.body;
    // Create a new student document
    const student = new Student({ name, grade });
    // Save the student document to the database
    await student.save();
    // Send a success response
    res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    // Send an error response if there is any error
    console.error(error);
    res.status(500).json({ error: 'Error enrolling student' });
  }
});

// Endpoint for retrieving all enrolled students (GET)
app.get('/api/students', async (req, res) => {
  try {
    // Retrieve all student documents from the database
    const students = await Student.find();
    // Send the list of students as a response
    res.status(200).json(students);
  } catch (error) {
    // Send an error response if there is any error
    console.error(error);
    res.status(500).json({ error: 'Error retrieving students' });
  }
});
const academicSchema = new mongoose.Schema({
  class: String,
  subject: String,
  schedule: String,
  syllabus: String,
});

const Academic = mongoose.model('Academic', academicSchema);

// Add Academic API
app.post('/api/add-academic', async (req, res) => {
  try {
    const academic = new Academic(req.body);
    await academic.save();
    res.json({ success: true, message: 'Academic information added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding academic information', error: error.message });
  }
});

// Get Academic API
app.get('/api/get-academics', async (req, res) => {
  try {
    const academics = await Academic.find();
    res.json({ success: true, academics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving academic information', error: error.message });
  }
});
// Grading Schema
const gradingSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    subject: String,
    gradeValue: String,
  });
  
  const Grading = mongoose.model('Grading', gradingSchema);
  
  // Add Grade API
  app.post('/api/add-grade', async (req, res) => {
    try {
      const grading = new Grading(req.body);
      await grading.save();
      res.json({ success: true, message: 'Grade added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding grade', error: error.message });
    }
  });
  
  // Get Grades API
  app.get('/api/get-grades', async (req, res) => {
    try {
      const grades = await Grading.find().populate('studentId', 'name');
      res.json({ success: true, grades });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving grades', error: error.message });
    }
  });

  const feeSchema = new mongoose.Schema({
    studentId: String,
    feeAmount: String,
    paymentDate: Date
  });
  
  const Fee = mongoose.model('Fee', feeSchema);
 
  app.use(cors());
  
  app.post('/api/addFee', async (req, res) => {
    try {
      const { studentId, feeAmount, paymentDate } = req.body;
      
      const newFee = new Fee({
        studentId,
        feeAmount,
        paymentDate
      });
  
      await newFee.save();
  
      res.json({ success: true, message: 'Fee information added successfully' });
    } catch (error) {
      console.error('Error adding fee:', error);
      res.status(500).json({ success: false, message: 'Error adding fee information' });
    }
  });
  

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;

app.post('/api/addStaff', async (req, res) => {
  try {
    const { name, role, department } = req.body;

    const newStaff = new Staff({
      name,
      role,
      department,
    });

    await newStaff.save();
    res.json({ success: true, message: 'Staff added successfully' });
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ success: false, message: 'Error adding staff' });
  }
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
