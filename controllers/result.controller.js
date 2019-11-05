const ResultSchema = require('./../models/result.model');
const QuestionSchema = require('./../models/question.model');
const utilities = require('./../utilities');
const examSchema = require('./../models/exam.model');

const submitResult = (req, res) => {
    QuestionSchema.find({ eid: req.body.eid }, { "_id": 0 }, (error, payload) => {
        if (error) {
            console.log(error);
        } else {
            const actualAnswers = payload;
            const userAnswers = req.body.answers;
            const userName = req.body.userName;
            const eid = req.body.eid;
            const result = calculateResult(userName, eid, actualAnswers, userAnswers);
            examSchema.find({ eid: req.body.eid}, (error, examDetails) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(examDetails, 'exam details');
                    let resultToSave = new ResultSchema({
                        eid: result.eid,
                        userName: result.userName,
                        finalResult: result.finalResult,
                        correctCount: result.correctCount,
                        wrongCount: result.wrongCount,
                        totalCount: result.totalCount,
                        lastAttemptDate: Date.now(),
                        examFamily: examDetails.family,
                        examDescription: examDetails.description
                    });
                    resultToSave.save((error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json(result);
                        }
                    })
                }
            });
        }
    });

}

const calculateResult = (userName, eid, actualAnswers, userAnswers) => {
    const response = { userName, eid };
    let correctCount = 0;
    let wrongCount = 0;
    let finalResult = [];
    const submissionMap = new Map();
    const questionMap = new Map();
    actualAnswers.map(question => {
        questionMap.set(question['qid'], question['answer'])
    });
    userAnswers.map(submission => {
        submissionMap.set(submission['qid'], submission['answer'])
    })
    for (let i = 0; i < actualAnswers.length; i++) {
        const key = actualAnswers[i]['qid'];
        const submittedAnswer = submissionMap.get(key);
        const actualAnswer = questionMap.get(key);
        if (submittedAnswer !== undefined && submittedAnswer !== '') {
            const resultObj = {
                qid: actualAnswers[i].qid,
                description: actualAnswers[i].description,
                isCorrect: false,
                correctAnswer: actualAnswer,
                yourAnswer: submittedAnswer
            }
            finalResult = [...finalResult, resultObj];
            if (actualAnswer === submittedAnswer) {
                correctCount += 1;
                resultObj.isCorrect = true;
            } else if (actualAnswer !== submittedAnswer) {
                wrongCount += 1;
            }
        }
    }
    const totalQuestions = questionMap.size;
    response.totalCount = totalQuestions;
    response.correctCount = correctCount;
    response.wrongCount = wrongCount;
    response.finalResult = finalResult;
    return response;
}

const fetchResult = (req, res) => {
    ResultSchema.find({ eid: req.body.eid, userName: req.body.userName }, (error, payload) => {
        utilities.sendResponse(res, payload, error);
    })
}

const deleteResult = (req, res) => {
    ResultSchema.deleteOne({ eid: req.body.eid, userName: req.body.userName }, (error) => {
        utilities.sendResponse(res, {}, error);
    })
}

const fetchAllResults = (req, res) => {
    ResultSchema.find({}, { "_id": 0, "__v": 0, "finalResult": 0, "wrongCount": 0 }, (error, payload) => {
        utilities.sendResponse(res, payload, error);
    })
}

const fetchCompletedExams = (req, res) => {
    ResultSchema.find({ userName: req.body.userName }, { "_id": 0, "__v": 0, "finalResult": 0 }, (error, payload) => {
        utilities.sendResponse(res, payload, error);
    })
}
module.exports = {
    submitResult,
    fetchResult,
    fetchAllResults,
    deleteResult,
    fetchCompletedExams
}