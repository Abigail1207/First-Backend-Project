const express = require('express')

const app = express()
const { getTopics } = require('./controller/topics.controller');
const { getArticles } = require('./controller/articles.controller');
app.use(express.json());

app.get('/api/topics' , getTopics);
app.get('/api/articles', getArticles);
app.use((req, res, next) => {
  res.status(404).send({mes : 'Not found' });
})

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
    //send with the form of obj
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const sqlErrCodes = ['22P02'];
  if (sqlErrCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;