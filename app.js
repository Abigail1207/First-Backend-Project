const express = require('express')
const app = express()
const { getTopics } = require('./controller/topics.controller');

app.use(express.json());

app.get('/api/topics' , getTopics);

app.use((req, res, next) => {
  res.status(404).send({mes : 'Not found' });
})


module.exports = app;