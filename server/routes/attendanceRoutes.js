
const router = require('express').Router();
const c = require('../controllers/attendanceController');
router.get('/', c.getAll);
router.get('/employee/:id', c.getByEmployee);
router.post('/', c.mark);
router.put('/:id', c.update);
router.get('/report/monthly', c.getMonthlyReport);
module.exports = router;
