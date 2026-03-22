const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

const modules = [
  {
    name: 'recruitment',
    endpoints: `
exports.getJobs = (req, res) => res.json([]);
exports.createJob = (req, res) => res.status(201).json({});
exports.updateJob = (req, res) => res.json({});
exports.getApplicants = (req, res) => res.json([]);
exports.updateApplicantStatus = (req, res) => res.json({});
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/recruitmentController');
router.get('/jobs', c.getJobs);
router.post('/jobs', c.createJob);
router.put('/jobs/:id', c.updateJob);
router.get('/jobs/:jobId/applicants', c.getApplicants);
router.patch('/applicants/:applicantId', c.updateApplicantStatus);
module.exports = router;
`
  },
  {
    name: 'performance',
    endpoints: `
exports.getAll = (req, res) => res.json([]);
exports.getMyReviews = (req, res) => res.json([]);
exports.create = (req, res) => res.status(201).json({});
exports.update = (req, res) => res.json({});
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/performanceController');
router.get('/', c.getAll);
router.get('/my', c.getMyReviews);
router.post('/', c.create);
router.put('/:id', c.update);
module.exports = router;
`
  },
  {
    name: 'payroll',
    endpoints: `
exports.getAll = (req, res) => res.json([]);
exports.getByEmployee = (req, res) => res.json([]);
exports.generate = (req, res) => res.status(201).json({});
exports.getMyPayslips = (req, res) => res.json([]);
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/payrollController');
router.get('/', c.getAll);
router.get('/my', c.getMyPayslips);
router.get('/employee/:id', c.getByEmployee);
router.post('/', c.generate);
module.exports = router;
`
  },
  {
    name: 'leave',
    endpoints: `
exports.getAll = (req, res) => res.json([]);
exports.getMyLeaves = (req, res) => res.json([]);
exports.apply = (req, res) => res.status(201).json({});
exports.approve = (req, res) => res.json({});
exports.reject = (req, res) => res.json({});
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/leaveController');
router.get('/', c.getAll);
router.get('/my', c.getMyLeaves);
router.post('/', c.apply);
router.patch('/:id/approve', c.approve);
router.patch('/:id/reject', c.reject);
module.exports = router;
`
  },
  {
    name: 'dashboard',
    endpoints: `
exports.getStats = (req, res) => res.json({});
exports.getAttendanceChart = (req, res) => res.json([]);
exports.getDepartmentChart = (req, res) => res.json([]);
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/dashboardController');
router.get('/stats', c.getStats);
router.get('/attendance-chart', c.getAttendanceChart);
router.get('/department-chart', c.getDepartmentChart);
module.exports = router;
`
  },
  {
    name: 'attendance',
    endpoints: `
exports.getAll = (req, res) => res.json([]);
exports.getByEmployee = (req, res) => res.json([]);
exports.mark = (req, res) => res.status(201).json({});
exports.update = (req, res) => res.json({});
exports.getMonthlyReport = (req, res) => res.json([]);
`,
    routes: `
const router = require('express').Router();
const c = require('../controllers/attendanceController');
router.get('/', c.getAll);
router.get('/employee/:id', c.getByEmployee);
router.post('/', c.mark);
router.put('/:id', c.update);
router.get('/report/monthly', c.getMonthlyReport);
module.exports = router;
`
  }
];

modules.forEach(m => {
  fs.writeFileSync(path.join(controllersDir, m.name + 'Controller.js'), m.endpoints);
  fs.writeFileSync(path.join(routesDir, m.name + 'Routes.js'), m.routes);
  console.log('Generated ' + m.name);
});
