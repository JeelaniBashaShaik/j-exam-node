const Exam = require('./../models/exam.model');
const utilities = require('./../utilities');
const joiSchemas = require('../joiSchemas');

const createExam = (req, res) => {
    const examToSave = {
        eid: req.body.eid,
        family: req.body.family,
        description: req.body.description
    }
    let exam = new Exam(examToSave);
    const { hasError, errorMessage } = utilities.joiValidate(joiSchemas.examJoiSchema, examToSave);
    if (hasError) {
        utilities.sendResponse(res, {}, errorMessage);
    } else {
        exam.save((error) => {
            if (error) {
                return next(error);
            }
            res.json({ result: 'success', payload: { message: 'Exam created successfully' } });
        })
    }
}

const fetchAllExams = (req, res) => {
    Exam.find((error, exams) => {
        utilities.sendResponse(res, exams, error);
    })
}

const updateExam = (req, res) => {
    Exam.updateOne({ eid: req.body.eid }, { $set: req.body }, (error, exam) => {
        utilities.sendResponse(res, exam, error);
    })
}

const deleteExam = (req, res) => {
    Exam.deleteOne({ eid: req.body.eid }, (error) => {
        utilities.sendResponse(res, {}, error);
    })
}

module.exports = {
    createExam,
    fetchAllExams,
    updateExam,
    deleteExam
}