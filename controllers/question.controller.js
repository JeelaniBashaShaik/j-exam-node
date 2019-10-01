const Question = require('./../models/question.model');
const utilities = require('./../utilities');
const joiSchemas = require('./../joiSchemas');

const saveQuestion = (req, res) => {
    const questionRequest = {
        qid: req.body.qid,
        description: req.body.description,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer,
        eid: req.body.eid
    }
    const { hasError, errorMessage } = utilities.joiValidate(joiSchemas.questionJoiSchema, questionRequest);
    if (hasError) {
        utilities.sendResponse(res, {}, errorMessage);
    } else {
        const questionToSave = new Question(questionRequest)
        questionToSave.save((error) => {
            utilities.sendResponse(res, { message: 'Question created successfully' }, error)
        })
    }

}

const fetchQuestions = (req, res) => {
    Question.find({ eid: req.params.eid }, { "answer": 0, "_id": 0, "__v": 0 }, (error, payload) => {
        utilities.sendResponse(res, payload, error);
    })
}

module.exports = {
    saveQuestion,
    fetchQuestions
}