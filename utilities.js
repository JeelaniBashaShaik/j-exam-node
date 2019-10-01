const colors = require('colors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const config = require('./config');

const print = (payload, color = 'black') => {
    console.log(colors[color](payload));
}

const logger = (request, response, next) => {
    const currentDate = new Date();
    const currentDay = getCurrentDay(currentDate);
    fs.appendFile(`./${currentDay}.txt`, `TS --> ${currentDay}_${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}, Endpoint --> ${request.url}, Method --> ${request.method}, Host --> ${request.headers.host}\r\n`, (error) => {
        if (error) {
            console.log(error);
        }
    })
    next();
}

const getCurrentDay = (currentDate) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${currentDate.getDate()}_${months[currentDate.getMonth()]}_${currentDate.getFullYear()}`;
}

const sendResponse = (res, payload = {}, error = {}) => {
    if (error) {
        console.log(colors.red(error));
        res.json({ result: 'failure', payload: error })
    } else {
        res.json({ result: 'success', payload })
    }
}

const verifyToken = (request, response, next) => {
    if (request.url === '/user/login' || request.url === '/user/register' || request.url === '/user/isAuthenticated') {
        next(); // bypass for login route
    } else {
        let token = request.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, (error) => {
                if (error) {
                    response.json({ authenticated: false, message: 'invalid token' })
                } else {
                    next();
                }
            })
        } else {
            response.json({ authenticated: false, message: 'no token provided' });
        }
    }
}

const joiValidate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        return { hasError: true, errorMessage: error.details[0].message };
    }
    return { hasError: false, errorMessage: '' }
}

module.exports = {
    print,
    sendResponse,
    verifyToken,
    logger,
    joiValidate
}