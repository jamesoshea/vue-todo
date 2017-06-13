const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const xssFilters = require('xss-filters')
const jwt = require('jsonwebtoken')

let router = express.Router()

const User = require('../models/user')

if(process.env.SECRET === undefined) {
  const secrets = require('../secrets.js')
  var secret = secrets.secret
} else {
  var secret = process.env.SECRET
}

//home route, sends app
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

router.post('/registerUser', (req, res) => {
  //validate input
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
	req.checkBody('email', 'Email is not valid').isEmail()
	req.checkBody('password', 'Password is required').notEmpty()
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password)

  let errors = req.validationErrors()
  if (errors) {
    res.status(400).json({message: errors})
  } else {

    User.findOne({email: req.body.email}, (err, doc) => {
      if (err) throw err
      if (doc) {
        res.status(400).json({message: [{msg: 'This email is already taken.'}]})
      } else {
        let newUser = new User({
          //sanitise user input
          email: xssFilters.inHTMLData(req.body.email),
          name: xssFilters.inHTMLData(req.body.name),
          password: xssFilters.inHTMLData(req.body.password),
          password2: xssFilters.inHTMLData(req.body.password2),
          todos: req.body.todos,
          completed: xssFilters.inHTMLData(req.body.completed)
        })
        //generate password hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
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
  let email = xssFilters.inHTMLData(req.body.email)
  let password = xssFilters.inHTMLData(req.body.password)
  User.findOne({email: email}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.status(400).json({message: [{msg: 'User not found.'}]})
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if (isMatch) {
          let token = jwt.sign({id: user._id}, secret, { expiresIn: '1h' })
          res.status(200).json({
            message: 'login successful',
            token: token,
            userData : {
              id: user._id,
              todos: user.todos,
              completed: user.completed,
              name: user.name
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
  jwt.verify(req.body.token, secret/* secret */, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: 'Please log in again.'})
    } else {
      req.body.todos.forEach((todo) => {
        todo.title = xssFilters.inHTMLData(todo.title)
        todo.text = xssFilters.inHTMLData(todo.text)
      })
      User.findOneAndUpdate({_id: decoded.id}, { $set: { "todos": req.body.todos} }, (err, doc) => {
        if (err) throw err
        res.status(200).json({ message: 'todos updated.'})
      })
    }
  })
})

router.post('/deleteTodo', (req, res) => {
  jwt.verify(req.body.token, secret/* secret */, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: 'Please log in again.'})
    } else {
      User.findOneAndUpdate({_id: decoded.id}, { $set: { "todos": req.body.todos} }, (err, doc) => {
        if (err) throw err
        res.status(200).json({ message: 'todos updated.'})
      })
    }
  })
})

router.post('/autoLogin', (req, res) => {
  jwt.verify(req.body.token, secret, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: 'Please log in again.'})
    } else {
      User.findOne({_id: decoded.id}, (err, user) => {
        if (err) throw err
        if (user) {
          res.status(200).json({ userData : { id: user._id, todos: user.todos, completed: user.completed, name: user.name}})
        } else {
          res.status(400).json({ message: 'User not found.'})
        }
      })
    }
  })
})

module.exports = router
