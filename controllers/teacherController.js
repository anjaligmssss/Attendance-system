const Code = require('../models/Code');
const Attendance = require('../models/Attendance');
const XLSX = require('xlsx');

// Generate random 6-character code
function generateRandomCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Render teacher panel
exports.renderTeacherPage = (req, res) => {
  res.render('teacher', { code: null });
};

// Generate code
exports.generateCode = async (req, res) => {
  try {
    const { className, subject } = req.body;
    const code = generateRandomCode();
    const newCode = new Code({ code, className, subject });
    await newCode.save();
    res.render('teacher', { code });
  } catch (err) {
    res.render('teacher', { code: 'Error generating code' });
  }
};

// Export Excel
exports.exportExcel = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    const data = attendances.map(a => ({
      Name: a.studentName,
      RollNumber: a.rollNumber,
      Class: a.className,
      Subject: a.subject,
      Time: a.timestamp
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    const filePath = 'Attendance.xlsx';
    XLSX.writeFile(wb, filePath);
    res.download(filePath);
  } catch (err) {
    res.status(500).send('Error generating Excel');
  }
};
