const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const xssFilters = require('xss-filters')
const jwt = require('jsonwebtoken')

let router = express.Router()

const User = require('../models/user')

//home route, sends app
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

router.post('/registerUser', (req, res) => {
  //validate input
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
	req.checkBody('email', 'Email is not valid').isEmail()
	req.checkBody('password', 'Password is required').notEmpty()
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  if (errors) {
    res.status(400).json({message: errors})
  } else {

    User.findOne({email: req.body.email}, (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.status(400).json({message: [{msg: 'This email is already taken.'}]})
      } else {
        var newUser = new User({
          //sanitise user input
          email: xssFilters.inHTMLData(req.body.email),
          name: xssFilters.inHTMLData(req.body.name),
          password: xssFilters.inHTMLData(req.body.password),
          password2: xssFilters.inHTMLData(req.body.password2),
          todos: req.body.todos,
          completed: xssFilters.inHTMLData(req.body.completed)
        })
        //generate password hash
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
              newUser.password = hash
              newUser.save((err) => {
                if(err) throw err
                res.status(200).json({message: 'User successfully created'})
              })
          })
        })
      }
    })
  }
})

router.post('/loginUser', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  User.findOne({email: email}, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(400).json({message: [{msg: 'User not found.'}]})
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if (isMatch) {
          let token = jwt.sign({id: user._id}, 'mememachine', { expiresIn: '1h' });
          res.status(200).json({
            message: 'login successful',
            token: token,
            userData : {
              id: user._id,
              todos: user.todos,
              completed: user.completed
            }
          })
        } else {
          res.status(400).json({message: [{msg: 'Password incorrect.'}]})
        }
      })
    }
  })
})

router.post('/addTodo', (req, res) => {
  jwt.verify(req.body.token, 'mememachine', function(err, decoded) {
    console.log(decoded.id)
    User.findOneAndUpdate({_id: decoded.id}, { $set: { "todos": req.body.todos}}, (err, doc) => {
      if (err) throw err;
      res.status(200).json({ message: 'todos updated.'})
    })
  });
})

module.exports = router
