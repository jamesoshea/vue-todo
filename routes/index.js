const express = require('express')
const mongoose = require('mongoose')

var router = express.Router()

var User = require('../models/user')

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

router.post('/registerUser', (req, res) => {

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    res.json({'message': errors});
  } else {
    var newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      password2: req.body.password2,
      todos: req.body.todos,
      completed: req.body.completed
    });
    console.log(newUser);
  }
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.send({status: 'failure'})
  }
}
module.exports = router
