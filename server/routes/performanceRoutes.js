
const router = require('express').Router();
const c = require('../controllers/performanceController');
router.get('/', c.getAll);
router.get('/my', c.getMyReviews);
router.post('/', c.create);
router.put('/:id', c.update);
module.exports = router;
