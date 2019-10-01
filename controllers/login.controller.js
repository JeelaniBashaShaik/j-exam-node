let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const config = require('./../config');

const login = (request, response) => {
    const { userName, password: passwordFromUser } = request.body;
    User.findOne({ userName: userName }, async (error, payload) => {
        if (error) {
            console.log(error, 'error');
        } else if (payload !== null) {
            const { password: hashedPassword } = payload;
            const isGenuineUser = await bcrypt.compare(passwordFromUser, hashedPassword);
            if (isGenuineUser) {
                const token = jwt.sign({ userName: userName }, config.secret, { expiresIn: "2h" });
                response.json({ authenticated: true, token: token });
            } else {
                response.json({ authenticated: false, message: 'username/password combination not found' });
            }
        } else {
            response.json({ authenticated: false, message: 'username not found' });
        }

    })

}

const register = async (request, response) => {
    const { userName, password, email, phone } = request.body;
    const hash = await bcrypt.hash(password, config.saltRounds);
    let user = new User({
        userName: userName,
        password: hash,
        email: email,
        phone: phone,
    });
    user.save((error) => {
        if (error) {
            return response.json({ registered: false, message: 'User was not registered' });
        }
        response.json({ registered: true, message: 'User Registered successfully, Login with your credentials now' });
    })
}

const isAuthorized = (request, response) => {
    const { token } = request.body;
    if (token) {
        jwt.verify(token, config.secret, (error) => {
            if (error) {
                response.json({ authenticated: false, message: 'invalid token' })
            } else {
                response.json({ authenticated: true, message: 'valid token' })
            }
        })
    } else {
        response.json({ authenticated: false, message: 'no token provided' });
    }
}

module.exports = {
    login,
    register,
    isAuthorized
}