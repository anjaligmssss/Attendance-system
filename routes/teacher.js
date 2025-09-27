const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.renderTeacherPage);
router.post('/generate', teacherController.generateCode);
router.get('/export', teacherController.exportExcel);

module.exports = router;
