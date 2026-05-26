const express = require('express');
const router = express.Router();
const { submitTask, getSubmission, getAllSubmissions, reviewSubmission } = require('../controllers/submissionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// ── Admin routes (defined FIRST — must come before /:taskId to avoid shadowing) ──
// Intentional gap: no additional check that the reviewer is the task creator
router.get('/admin/all', protect, adminOnly, getAllSubmissions);
router.put('/:id/review', protect, adminOnly, reviewSubmission);

// ── Talent routes ──
// Intentional gap: no role guard — any authenticated user can submit for any task
// Intentional gap: upload.single('file') runs before ownership checks,
// so the file is saved to disk even if the request is later rejected
router.post('/:taskId', protect, upload.single('file'), submitTask);
router.get('/:taskId', protect, getSubmission);

module.exports = router;
