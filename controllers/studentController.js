const Code = require('../models/Code');
const Attendance = require('../models/Attendance');

// Render student panel
exports.renderStudentPage = (req, res) => {
  res.render('student', { message: null });
};

// Submit attendance
exports.submitAttendance = async (req, res) => {
  try {
    const { studentName, rollNumber, code } = req.body;
    const codeEntry = await Code.findOne({ code });

    if (!codeEntry) return res.render('student', { message: '❌ Invalid or expired code' });

    const attendance = new Attendance({
      studentName,
      rollNumber,
      className: codeEntry.className,
      subject: codeEntry.subject
    });
    await attendance.save();

    res.render('student', { message: `✅ Attendance stored for ${codeEntry.className} - ${codeEntry.subject}` });
  } catch (err) {
    res.render('student', { message: '❌ Error submitting attendance' });
  }
};
