const express = require('express')
let app = express()

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/login', function (req, res) {
  res.send('hello')
})

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Server started.')
})
