const Joi = require('@hapi/joi');

const examJoiSchema = Joi.object().keys({
    eid: Joi.string().required(),
    family: Joi.string().required(),
    description: Joi.string().required()
})

const questionJoiSchema = Joi.object().keys({
    qid: Joi.string().required(),
    description: Joi.string().required(),
    option1: Joi.string().required(),
    option2: Joi.string().required(),
    option3: Joi.string().required(),
    option4: Joi.string().required(),
    eid: Joi.string().required(),
    answer: Joi.string().required()
})

module.exports = {
    examJoiSchema,
    questionJoiSchema
}