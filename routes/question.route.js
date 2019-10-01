const express = require('express');
const router = express.Router();
const QuestionController = require('./../controllers/question.controller');

router.post('/createQuestion', QuestionController.saveQuestion);

router.get('/fetchQuestions/:eid', QuestionController.fetchQuestions);

module.exports = router;