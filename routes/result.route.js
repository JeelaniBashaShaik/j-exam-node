const express = require('express');
const router = express.Router();
const ResultsController = require('./../controllers/result.controller');

//take answers as input, calculate result and store it
router.post('/submit', ResultsController.submitResult);

//fetch result based on username and eid
router.post('/fetchResult', ResultsController.fetchResult);

//fetch all results to display for admin
router.get('/fetchAllResults', ResultsController.fetchAllResults);

router.post('/deleteResult', ResultsController.deleteResult);

// fetch results of all exams completed by specific user
router.post('/fetchCompletedExams', ResultsController.fetchCompletedExams);

module.exports = router;