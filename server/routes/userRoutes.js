const express = require('express');
const router = express.Router();
const {
  createHR,
  createEmployeeUser,
  getAllHRs,
  getAllEmployees,
  getUserById,
  updateUser,
  deleteUser,
  toggleActive,
} = require('../controllers/userController');

// All endpoints start with /api/users
router.post('/create-hr', createHR);
router.post('/create-employee', createEmployeeUser);
router.get('/hrs', getAllHRs);
router.get('/employees', getAllEmployees);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.patch('/:id/toggle-active', toggleActive);

module.exports = router;
