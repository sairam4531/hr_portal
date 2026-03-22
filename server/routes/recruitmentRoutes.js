
const router = require('express').Router();
const c = require('../controllers/recruitmentController');
router.get('/jobs', c.getJobs);
router.post('/jobs', c.createJob);
router.put('/jobs/:id', c.updateJob);
router.get('/jobs/:jobId/applicants', c.getApplicants);
router.patch('/applicants/:applicantId', c.updateApplicantStatus);
module.exports = router;
