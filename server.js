const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')

if (process.env.DBSTRING === undefined) {
  const secrets = require('./secrets.js')
  mongoose.connect(secrets.dbstring)
} else {
  mongoose.connect(process.env.DBSTRING)
}


let app = express()

app.use(express.static(__dirname + '/public'))

//secret for jwt
app.set('superSecret', 'mememachine')

let routes = require('./routes/index')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter(param, msg, value) {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}))

//use route files
app.use('/', routes)

// Set Port
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), () => {
  console.log('Server started.')
})
