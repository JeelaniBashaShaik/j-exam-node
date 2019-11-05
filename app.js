const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config.js');
const utilities = require('./utilities');
const examRoutes = require('./routes/exam.route');
const QuestionRoutes = require('./routes/question.route');
const resultRoutes = require('./routes/result.route');
const loginRoutes = require('./routes/login.route');

const dbUrl = `mongodb://${config.dbUserName}:${config.dbPassword}@ds125272.mlab.com:25272/inc-exam`;

const app = express();

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to mongodb'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(utilities.logger);
app.use(utilities.verifyToken);
app.use('/exam', examRoutes);
app.use('/question', QuestionRoutes);
app.use('/result', resultRoutes);
app.use('/user', loginRoutes);

app.listen(process.env.PORT || config.portNumber, () => console.log('server started'));