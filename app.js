var express = require('express')
var nunjucks = require('nunjucks')
var app = express()

// Set the template engine to use nunjucks
app.set('view engine', 'nunjucks')

// Set the location of the template files
var appViews = [
  'views'
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
