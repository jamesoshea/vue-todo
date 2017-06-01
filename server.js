const express = require('express')
const bodyParser = require('body-parser');
let app = express()

app.use(express.static(__dirname + '/public'));

var routes = require('./routes/index');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use route files
app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Server started.')
})
