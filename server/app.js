const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebase = require("firebase");
const bodyParser = require('body-parser');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const config = {
    apiKey: "AIzaSyC_DJr2w7CdKZV3BxNpRU5uvakYRjNYNh4",
    authDomain: "rubicamp-go.firebaseapp.com",
    databaseURL: "https://rubicamp-go.firebaseio.com",
    projectId: "rubicamp-go",
    storageBucket: "rubicamp-go.appspot.com",
    messagingSenderId: "1033338289649"
  };
firebase.initializeApp(config);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

const userSchema = require('./graphql').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));


module.exports = app;
