
const router = require('express').Router();
const c = require('../controllers/dashboardController');
router.get('/stats', c.getStats);
router.get('/attendance-chart', c.getAttendanceChart);
router.get('/department-chart', c.getDepartmentChart);
module.exports = router;
