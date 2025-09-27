const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.renderStudentPage);
router.post('/submit', studentController.submitAttendance);

module.exports = router;
