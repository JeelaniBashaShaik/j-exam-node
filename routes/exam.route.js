const express = require('express');
const router = express.Router();
const utilities = require('./../utilities');
const examController = require('./../controllers/exam.controller');


router.post('/createExam', examController.createExam);

router.get('/fetchAllExams', examController.fetchAllExams);

router.post('/updateExam', examController.updateExam);

router.post('/deleteExam', examController.deleteExam);

module.exports = router;