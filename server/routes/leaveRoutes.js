
const router = require('express').Router();
const c = require('../controllers/leaveController');
router.get('/', c.getAll);
router.get('/my', c.getMyLeaves);
router.post('/', c.apply);
router.patch('/:id/approve', c.approve);
router.patch('/:id/reject', c.reject);
module.exports = router;
