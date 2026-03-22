
const router = require('express').Router();
const c = require('../controllers/payrollController');
router.get('/', c.getAll);
router.get('/my', c.getMyPayslips);
router.get('/employee/:id', c.getByEmployee);
router.post('/', c.generate);
module.exports = router;
