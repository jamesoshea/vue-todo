const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')

mongoose.connect('mongodb://james:DBtelecaster1@ds159371.mlab.com:59371/jim-todo')
let app = express()

app.use(express.static(__dirname + '/public'));

//secret for jwt
app.set('superSecret', 'mememachine');

var routes = require('./routes/index');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//use route files
app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Server started.')
})
