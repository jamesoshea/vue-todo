const express = require('express')
const mongoose = require('mongoose')
var router = express.Router()

var User = require('../models/user')

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

router.post('/registerUser', (req, res) => {
  if (req.body.password !== req.body.password2) {
    res.sendStatus(200).json({ message: "Your passwords did not match" });
  }

  var stuff = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    password2: req.body.password2,
    todos: req.body.todos,
    completed: req.body.completed
  }
  console.log(stuff.todos)
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.send({status: 'failure'})
  }
}
module.exports = router
